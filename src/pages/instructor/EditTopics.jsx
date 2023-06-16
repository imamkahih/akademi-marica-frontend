import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import { setAlert, setLoading } from "../../redux/notificationReducer";
import { getTopicsDetail, updateTopics } from "../../services/instructor";
import * as Yup from "yup";

export default function EditTopics() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.notification.loading);
  const confirm = useSelector((state) => state.notification.confirm);
  const alert = useSelector((state) => state.notification.alert);
  const token = useSelector((state) => state.user.token);
  const id_instructor = localStorage.getItem("id_user");
  const { id } = useParams();
  useEffect(() => {
    dispatch(setLoading(true));
    getTopicsDetail(id, token)
      .then((response) => {
        const { description, title, id_courses } = response.data;
        formik.setValues({
          ...formik.values,
          description,
          title,
          id_courses,
        });
      })
      .catch((error) => console.log("error", error))
      .finally(() => dispatch(setLoading(false)));
  }, []);
  const formik = useFormik({
    initialValues: {
      id_courses: "",
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Maksimal 100 karakter")
        .required("Silahkan isi judul topik pembelajaran"),
    }),
    onSubmit: (values) => {
      dispatch(setLoading(true));
      updateTopics(id, values, token)
        .then((response) => {
          if (response.status === 200) {
            dispatch(
              setAlert({
                type: "success",
                message: "Topik pembelajaran berhasil dibuat",
                show: true,
              })
            );
            navigate(`/instructor/courses/${response.data.id_courses}`);
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
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Judul Topik
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
              placeholder="Judul Topik Pembelajaran..."
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
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Deskripsi Topik Pembelajaran (opsional)
            </label>
            <textarea
              id="description"
              rows="3"
              name="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 "
              placeholder="Tulis deskripsi topik pembelajaran disini..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            ></textarea>
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
