import logo from "../assets/logo-big.svg";
import background from "../assets/bg-login.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { postLogin } from "../services/auth";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
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
    onSubmit: (values) => {
      console.log("values", values);
      setIsLoading(true);
      // postLogin(values)
      //   .then((response) => console.log("response", response))
      //   .catch((error) => console.log("error", error))
      //   .finally(() => {
      //     setIsLoading(false);
      //   });
    },
  });
  return (
    <>
      {/* <Alert /> */}
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
              <div
                className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Info alert!</span> Change a few
                  things up and try submitting again.
                </div>
              </div>
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
                    className={`w-full text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        className="animate-spin"
                      />
                    ) : (
                      "Sign in"
                    )}
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
