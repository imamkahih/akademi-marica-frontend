import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import Sidebar from "../../components/Sidebar";
import * as Yup from "yup";
import { setAlert, setLoading } from "../../redux/notificationReducer";
import { postInstructor } from "../../services/admin";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.notification.loading);
  const confirm = useSelector((state) => state.notification.confirm);
  const alert = useSelector((state) => state.notification.alert);
  const token = useSelector((state) => state.user.token);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Silahkan isi dengan nama lengkap"),
      email: Yup.string()
        .email("Email tidak valid")
        .required("Silahkan isi dengan email"),
      phone_number: Yup.string()
        .min(10, "Minimal 10 nomor")
        .matches(/^[0-9]+$/, "Silahkan isi dengan nomor")
        .required("Silahkan isi nomor telpon"),
      password: Yup.string()
        .min(6, "Minimal 6 karakter")
        .required("Silahkan isi password anda"),
      confirmPassword: Yup.string()
        .min(6)
        .oneOf([Yup.ref("password")], "Password tidak sama")
        .required("Silahkan isi konfirmasi password"),
    }),
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phone_number", values.phone_number);
      dispatch(setLoading(true));
      postInstructor(formData, token)
        .then((response) => {
          if (response.status === 200) {
            dispatch(
              setAlert({
                type: "success",
                message: "Akun instruktur berhasil dibuat",
                show: true,
              })
            );
            navigate("/admin/instructor");
          } else {
            dispatch(
              setAlert({
                type: "error",
                message: response.message,
                show: true,
              })
            );
          }
        })
        .catch((error) => {
          console.log("error", error);
        })
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
        <h2 className="text-xl font-bold  text-gray-900">Tambah Instruktur</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
              placeholder="John Doe"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.name}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
              placeholder="name@flowbite.com"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone_number"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nomor Telpon
            </label>
            <input
              type="text"
              id="phone_number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
              placeholder="08xxxxxxxxx"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
            />
            {formik.touched.phone_number && formik.errors.phone_number ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.phone_number}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
              placeholder="******"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
              placeholder="******"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {formik.errors.confirmPassword}
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
