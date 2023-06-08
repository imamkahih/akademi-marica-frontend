import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo-big.svg";

export default function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const toogleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center w-10 h-10
         justify-center mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        onClick={toogleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <FontAwesomeIcon icon={faBars} size="xl" />
      </button>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebar ? "-translate-x-full" : ""
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-pink-100">
          <div className="flex p-3 mb-5 justify-between items-center bg-white rounded-xl">
            <div className="flex mx-auto items-center">
              <img src={logo} className="h-10" alt="Akademi Marica Logo" />
            </div>
            <div>
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center w-10 h-10
         justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                onClick={toogleSidebar}
              >
                <span className="sr-only">Close sidebar</span>

                <FontAwesomeIcon icon={faXmark} size="xl" />
              </button>
            </div>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 border-2 border-pink-200 rounded-lg  hover:bg-pink-300 "
              >
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 border-2 border-pink-200 rounded-lg  hover:bg-pink-300 "
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 border-2 border-pink-200 rounded-lg  hover:bg-pink-300 "
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 border-2 border-pink-200 rounded-lg  hover:bg-pink-300 "
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 border-2 border-pink-200 rounded-lg  hover:bg-pink-300 "
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
