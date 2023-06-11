import React from "react";
import { useDispatch } from "react-redux";
import { closeConfirm } from "../redux/notificationReducer";

export default function ConfirmDialog({ message, handleConfirm, show }) {
  const dispatch = useDispatch();
  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`${
          show ? "flex" : "hidden"
        } fixed top-0 left-0 right-0 z-50  items-center justify-center bg-black bg-opacity-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0`}
      >
        <div className="relative w-full max-w-md">
          <div className="relative bg-white rounded-lg shadow">
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                {message}
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="
                 text-white bg-pink-500 hover:bg-pink-600  focus:ring-pink-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                   focus:ring-4 focus:outline-none  dark:focus:ring-red-800  inline-flex items-center  mr-2"
                onClick={() => handleConfirm()}
              >
                Yakin
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-900 bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border-2 border-gray-300 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                onClick={() => dispatch(closeConfirm())}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
