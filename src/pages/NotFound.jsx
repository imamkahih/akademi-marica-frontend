import React from "react";
import background from "../assets/bg-login.svg";
import logo from "../assets/logo-big.svg";
import imgNotFound from "../assets/not-found.svg";

export default function NotFound() {
  return (
    <section
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex flex-col gap-3 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img className="w-52 h-auto" src={logo} alt="logo" />
        <img className="w-64 h-auto" src={imgNotFound} alt="not found" />
        <label className=" text-2xl font-medium text-gray-900 ">
          Halaman tidak ditemukan!
        </label>
      </div>
    </section>
  );
}
