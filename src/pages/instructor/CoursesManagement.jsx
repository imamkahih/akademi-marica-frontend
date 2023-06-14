import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import {
  closeConfirm,
  openConfirm,
  setAlert,
  setLoading,
} from "../../redux/notificationReducer";
import {
  deleteCourses,
  getCategories,
  getCourses,
} from "../../services/instructor";

export default function CoursesManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.notification.loading);
  const confirm = useSelector((state) => state.notification.confirm);
  const alert = useSelector((state) => state.notification.alert);
  const token = useSelector((state) => state.user.token);
  const [myCourses, setMyCourses] = useState(null);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    dispatch(setLoading(true));
    getCategories(token)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log("error", error));
    getCourses(token)
      .then((response) => {
        setMyCourses(response.courses);
      })
      .catch((error) => console.log("error", error))
      .finally(() => dispatch(setLoading(false)));
  }, []);
  const handleAdd = () => {
    navigate("/instructor/courses/add");
  };
  const categoryName = (id) => {
    if (categories) {
      const category = categories.filter(
        (data) => data.id.toString() === id.toString()
      )[0];
      return category.category_name;
    }
  };
  const handleDelete = (id) => {
    dispatch(
      openConfirm({
        message: "Apakah anda ingin menghapus itu?",
        confirm: () => performDelete(id),
      })
    );
  };
  const performDelete = (id) => {
    dispatch(setLoading(true));
    deleteCourses(id, token)
      .then((response) => {
        if (response.status === 200) {
          getCourses(token)
            .then((response) => {
              setMyCourses(response.courses);
            })
            .catch((error) => console.log("error", error))
            .finally(() => dispatch(setLoading(false)));
        }
      })
      .catch((error) => console.log("error", error));
    dispatch(closeConfirm());
    dispatch(
      setAlert({
        type: "success",
        message: "Berhasil dihapus",
        show: true,
      })
    );
  };

  return (
    <>
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
      <Loading isLoading={isLoading} />
      <div className="p-4 sm:ml-64 space-y-3">
        <h2 className="text-xl font-bold  text-gray-900">Manajemen Kursus</h2>
        <button
          type="button"
          className="focus:outline-none btn text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-2 text-sm text-center "
          onClick={() => handleAdd()}
        >
          Tambah Kursus
        </button>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nama kursus
                </th>
                <th scope="col" className="px-6 py-3">
                  kategori
                </th>
                <th scope="col" className="px-6 py-3">
                  harga
                </th>
                <th scope="col" className="px-6 py-3">
                  thumbnail
                </th>
                <th scope="col" className="px-6 py-3">
                  Opsi
                </th>
              </tr>
            </thead>
            <tbody>
              {myCourses ? (
                myCourses.map((item) => {
                  return (
                    <tr className="bg-white border-b" key={item.id}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {item.course_name}
                      </th>
                      <td className="px-6 py-4">
                        {categoryName(item.id_category)}
                      </td>
                      <td className="px-6 py-4">{item.price}</td>
                      <td className="px-6 py-4">
                        <img
                          className="h-auto max-w-xs"
                          src={item.thumbnail}
                          alt="thumbnail image"
                        />
                      </td>
                      <td className="px-6 py-4 flex space-x-3">
                        <Link to={`/instructor/courses/${item.id}`}>
                          <button
                            type="button"
                            className="focus:outline-none btn text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-2 text-sm text-center"
                          >
                            Lihat
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="focus:outline-none btn text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-3 py-2 text-sm text-center"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="bg-white border-b">
                  <td colSpan="5">Tidak ada data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
