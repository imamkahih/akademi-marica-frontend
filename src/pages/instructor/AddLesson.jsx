import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import { setAlert, setLoading } from "../../redux/notificationReducer";
import * as Yup from "yup";
import { postLessonTopics } from "../../services/instructor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddLesson() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.notification.loading);
  const confirm = useSelector((state) => state.notification.confirm);
  const alert = useSelector((state) => state.notification.alert);
  const token = useSelector((state) => state.user.token);
  const [contentType, setContentType] = useState(null);
  const location = useLocation();
  const { id } = location.state;
  const [editorValue, setEditorValue] = useState("");
  const handleEditorChange = (value) => {
    setEditorValue(value);
  };
  const formik = useFormik({
    initialValues: {
      id_course_topics: id,
      title: "",
      content_type: "",
      video: null,
      pdf: null,
      text: null,
      description: null,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Silahkan isi judul materi pembelajaran")
        .max(100, "Maksimal 100 karakter"),
      content_type: Yup.string().required(
        "Silahkan isi jenis  materi pembelajaran"
      ),
      text: Yup.string().test("no-empty-line", "Teks boleh kosong", (value) => {
        if (!value || value !== "<p><br></p>") {
          return true;
        }
        return false;
      }),
      video: Yup.string()
        .test("youtube-link", "Invalid YouTube link", function (value) {
          if (!value) {
            return true;
          }
          const youtubeLinkRegex =
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11}).*$/;
          return youtubeLinkRegex.test(value);
        })
        .nullable(),
      pdf: Yup.mixed()
        .test("fileFormat", "Hanya file PDF yang diperbolehkan", (value) => {
          if (value) {
            return value.type === "application/pdf";
          }
          return true; // Allow empty field, you can modify this behavior
        })
        .test("fileSize", "Ukuran file tidak boleh melebihi 10 MB", (value) => {
          if (value) {
            return value.size <= 10 * 1024 * 1024; // 10 MB in bytes
          }
          return true; // Allow empty field, you can modify this behavior
        }),
      description: Yup.string().required(
        "Silahkan isi deskripsi materi pembelajaran"
      ),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("id_course_topics", values.id_course_topics);
      formData.append("title", values.title);
      formData.append("content_type", values.content_type);
      formData.append("video", values.video);
      formData.append("pdf", values.pdf);
      formData.append("text", values.text);
      formData.append("description", values.description);
      dispatch(setLoading(true));
      postLessonTopics(formData, token)
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) {
            dispatch(
              setAlert({
                type: "success",
                message: "Topik pembelajaran berhasil dibuat",
                show: true,
              })
            );
            navigate(
              `/instructor/courses/topics/` + response.data.id_course_topics
            );
          } else {
            dispatch(
              setAlert({
                type: "error",
                message: "Gagal",
                show: true,
              })
            );
          }
        })
        .catch((error) => console.log("error", error))
        .finally(() => dispatch(setLoading(false)));
    },
  });
  const handleContentTypeChange = (e) => {
    formik.handleChange(e);
    formik.setFieldValue("pdf", "");
    formik.setFieldValue("video", "");
    formik.setFieldValue("text", "");
    setEditorValue("");
    setContentType(e.target.value);
  };
  return (
    <>
      <Loading isLoading={isLoading} />
      <Sidebar />
      <ConfirmDialog
        show={confirm.show}
        message={confirm.message}
        handleConfirm={confirm.confirm}
      />
      <Alert
        type={alert.type}
        show={alert.show}
        message={alert.message}
        setShow={(data) => {
          dispatch(
            setAlert({
              show: data,
              type: "",
              message: "Belum diatur",
            })
          );
        }}
        withTimeout
      />
      <div className="p-4 sm:ml-64 space-y-3">
        <h2 className="text-xl font-bold text-gray-900">
          Tambah Materi Pembelajaran
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Judul Materi Pembalajaran
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
              placeholder="Judul Materi Pembelajaran..."
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.title}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="content_type"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Jenis Materi
            </label>
            <select
              id="content_type"
              name="content_type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
              onChange={handleContentTypeChange}
              onBlur={formik.handleBlur}
              value={formik.values.content_type}
            >
              <option value="">Pilih Jenis Materi</option>
              <option value="pdf">PDF</option>
              <option value="text">Text</option>
              <option value="video">Video</option>
            </select>
            {formik.touched.content_type && formik.errors.content_type ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.content_type}
              </p>
            ) : null}
          </div>
          {contentType && contentType === "video" ? (
            <div className="mb-5">
              <label
                htmlFor="video"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Link Youtube Video Pembelajaran
              </label>
              <input
                type="text"
                id="video"
                name="video"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
                placeholder="Link youtube video pembelajaran"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.video}
                required
              />
              {formik.touched.video && formik.errors.video ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {formik.errors.video}
                </p>
              ) : null}
            </div>
          ) : contentType && contentType === "pdf" ? (
            <div className="mb-5">
              <label
                htmlFor="pdf"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                File PDF
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                aria-describedby="file_input_help"
                id="pdf"
                type="file"
                name="pdf"
                onChange={(event) => {
                  formik.setFieldValue("pdf", event.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
                required
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                PDF (Maksimal 10 MB).
              </p>
              {formik.touched.pdf && formik.errors.pdf ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {formik.errors.pdf}
                </p>
              ) : null}
            </div>
          ) : contentType && contentType === "text" ? (
            <div className="mb-5">
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Text Pembelajaran
              </label>
              <ReactQuill
                value={editorValue}
                onChange={(value) => {
                  handleEditorChange(value);
                  formik.setFieldValue("text", value);
                }}
              />
              <input
                type="hidden"
                id="text"
                name="text"
                value={formik.values.text}
                onBlur={formik.handleBlur}
              />
              {formik.touched.text && formik.errors.text ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {formik.errors.text}
                </p>
              ) : null}
            </div>
          ) : (
            ""
          )}

          {contentType && (
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Deskripsi Materi
              </label>
              <textarea
                id="description"
                rows="3"
                name="description"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 "
                placeholder="Tulis deskripsi kursus disini..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {formik.errors.description}
                </p>
              ) : null}
            </div>
          )}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Simpan
          </button>
        </form>
      </div>
    </>
  );
}
