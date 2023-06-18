import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import { setAlert, setLoading } from "../../redux/notificationReducer";
import {
  getCategories,
  getCoursesDetail,
  updateCourses,
} from "../../services/instructor";
import * as Yup from "yup";

export default function EditCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.notification.loading);
  const confirm = useSelector((state) => state.notification.confirm);
  const alert = useSelector((state) => state.notification.alert);
  const token = useSelector((state) => state.user.token);
  const [categories, setCategories] = useState(null);
  const id_instructor = localStorage.getItem("id_user");
  const { id } = useParams();
  useEffect(() => {
    dispatch(setLoading(true));
    getCoursesDetail(id, token)
      .then((response) => {
        const {
          course_name,
          id_category,
          thumbnail,
          teaser_url,
          price,
          course_description,
        } = response.data;
        formik.setValues({
          ...formik.values,
          course_name,
          id_category,
          thumbnail: null, // Isi dengan null karena thumbnail tidak dapat diisi langsung dari detail kursus
          teaser_url,
          price,
          course_description,
        });
        getCategories(token)
          .then((response) => setCategories(response.data))
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error))
      .finally(() => dispatch(setLoading(false)));
  }, []);
  const formik = useFormik({
    initialValues: {
      id_instructor: id_instructor,
      id_category: "",
      course_name: "",
      thumbnail: null,
      teaser_url: "",
      price: "",
      course_description: "",
    },
    validationSchema: Yup.object({
      id_category: Yup.string().required("Kategori harus dipilih"),
      course_name: Yup.string()
        .max(100, "Maksimal 100 karakter")
        .required("Silahkan diisi"),
      thumbnail: Yup.mixed()
        .required("Silahkan isi thumbnail")
        .test("fileSize", "Maksimal file 2 mB", (value) => {
          if (!value) return true; // Skip validation if no file is selected
          return value && value.size <= 2 * 1024 * 1024; // Maximum size of 2 MB
        })
        .test("fileType", "Tipe file invalid", (value) => {
          if (!value) return true; // Skip validation if no file is selected
          return (
            ["image/jpeg", "image/png", "image/gif", "image/svg+xml"].includes(
              value.type
            ) || value.name.toLowerCase().endsWith(".svg")
          );
        }),
      teaser_url: Yup.string()
        .required("Silahkan isi link teaser kursus")
        .matches(
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11}).*$/,
          "Invalid YouTube link"
        ),
      price: Yup.string()
        .required("Silahkan isi harga kursus")
        .matches(/^[0-9]+$/, "Silahkan isi dengan angka"),
      course_description: Yup.string()
        .max(255, "Maksimal 255 karakter")
        .required("Silahkan isi deskripsi kursus"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("course_description", values.course_description);
      formData.append("course_name", values.course_name);
      formData.append("id_category", values.id_category);
      formData.append("id_instructor", id_instructor);
      formData.append("price", values.price);
      formData.append("teaser_url", values.teaser_url);
      formData.append("thumbnail", values.thumbnail);
      formData.append("_method", "PATCH");
      dispatch(setLoading(true));
      updateCourses(id, formData, token)
        .then((response) => {
          if (response.status === 200) {
            dispatch(
              setAlert({
                type: "success",
                message: "Kursus berhasil diubah",
                show: true,
              })
            );
            navigate("/instructor/courses");
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
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
  });
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
        <h2 className="text-xl font-bold  text-gray-900">Edit Kursus</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Judul Kursus
            </label>
            <input
              type="text"
              id="name"
              name="course_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
              placeholder="Judul kursus..."
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.course_name}
            />
            {formik.touched.course_name && formik.errors.course_name ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.course_name}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Kategori Kursus
            </label>
            <select
              id="category"
              name="id_category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.id_category}
            >
              <option value="">Pilih kategori kursus</option>
              {categories && categories.length > 0 ? (
                categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.category_name}
                  </option>
                ))
              ) : (
                <option value="">No categories found</option>
              )}
            </select>
            {formik.touched.id_category && formik.errors.id_category ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.id_category}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="thumbnail"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Thumbnail
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
              aria-describedby="file_input_help"
              id="thumbnail"
              type="file"
              name="thumbnail"
              onChange={(event) => {
                formik.setFieldValue("thumbnail", event.currentTarget.files[0]); // Update the formik value
              }}
              onBlur={formik.handleBlur}
              required
            />
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              SVG, PNG, JPG or GIF (Maksimal 2 MB).
            </p>
            {formik.touched.thumbnail && formik.errors.thumbnail ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.thumbnail}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="teaser"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Link Video Teaser
            </label>
            <input
              type="text"
              id="teaser"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
              placeholder="Link video teaser kursus anda..."
              name="teaser_url"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.teaser_url}
            />
            {formik.touched.teaser_url && formik.errors.teaser_url ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.teaser_url}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Harga
            </label>
            <input
              type="text"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
              placeholder="Harga kursus"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.price}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Deskripsi Kursus
            </label>
            <textarea
              id="description"
              rows="3"
              name="course_description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 "
              placeholder="Tulis deskripsi kursus disini..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.course_description}
              required
            ></textarea>
            {formik.touched.course_description &&
            formik.errors.course_description ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.course_description}
              </p>
            ) : null}
          </div>
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
