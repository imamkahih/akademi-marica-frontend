import logo from "../assets/logo-big.svg";
import background from "../assets/bg-login.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setLoading } from "../redux/notificationReducer";
import { postLogin } from "../services/auth";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/userReducer";
import { useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.notification.loading);
  const alert = useSelector((state) => state.notification.alert);
  const dispatch = useDispatch();
  const currentRole = localStorage.getItem("role");
  const currentToken = localStorage.getItem("token");

  useEffect(() => {
    if (currentRole !== null && currentToken !== null) {
      const data = { role: currentRole, token: currentToken };
      dispatch(loginSuccess(data));
    }
    if (currentRole === "1") {
      navigate("/admin");
    }
    if (currentRole === "2") {
      navigate("/instructor");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email tidak valid.")
        .required("Silahkan isi email anda."),
      password: Yup.string().required("Silahkan isi password anda"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(setLoading(true));
      postLogin(values)
        .then((response) => {
          if (response.status === 200) {
            const token = response.access_token.split("|")[1];
            const role = response.role;
            if (response.role === "1") {
              localStorage.setItem("role", role);
              localStorage.setItem("token", token);
              dispatch(loginSuccess({ role: role, token: token }));
              dispatch(
                setAlert({
                  type: "success",
                  show: true,
                  message: "Login Berhasil, selamat datang Admin.",
                })
              );
              navigate("/admin");
            } else if (response.role === "2") {
              localStorage.setItem("role", role);
              localStorage.setItem("token", token);
              dispatch(loginSuccess({ role: role, token: token }));
              dispatch(
                setAlert({
                  type: "success",
                  message:
                    "Login Berhasil, selamat datang " + response.data.name,
                  show: true,
                })
              );
              navigate("/instructor");
            } else {
              dispatch(
                setAlert({
                  type: "error",
                  message: "Silahkan untuk masuk pada aplikasi mobile",
                  show: true,
                })
              );
            }
          } else {
            dispatch(
              setAlert({
                type: "error",
                message: "Email atau password salah.",
                show: true,
              })
            );
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          dispatch(setLoading(false));
          resetForm();
        });
    },
  });
  return (
    <>
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
      <Loading isLoading={isLoading} />
      <section
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <img className="w-52 h-auto mb-6" src={logo} alt="logo" />
          <div className="w-full bg-white rounded-lg shadow-lg  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
                    placeholder="name@company.com"
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
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 "
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
                <div>
                  <button
                    type="submit"
                    className="w-full text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
