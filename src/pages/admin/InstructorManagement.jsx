import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { deleteInstructor, getInstructor } from "../../services/admin";

export default function InstructorManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm = useSelector((state) => state.notification.confirm);
  const isLoading = useSelector((state) => state.notification.loading);
  const alert = useSelector((state) => state.notification.alert);
  const token = useSelector((state) => state.user.token);
  const [dataInstructor, setDataInstructor] = useState(null);
  useEffect(() => {
    dispatch(setLoading(true));
    getInstructor(token)
      .then((response) => {
        console.log("response", response);
        setDataInstructor(response);
      })
      .catch((error) => console.log("error", error))
      .finally(() => dispatch(setLoading(false)));
  }, []);
  const handleAdd = () => {
    navigate("/admin/instructor/add");
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
    deleteInstructor(id, token)
      .then((response) => {
        if (response.status === 200) {
          getInstructor(token)
            .then((response) => {
              setDataInstructor(response);
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
        <h2 className="text-xl font-bold  text-gray-900">
          Manajemen Instruktur
        </h2>
        <button
          type="button"
          className="focus:outline-none btn text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-2 text-sm text-center "
          onClick={() => handleAdd()}
        >
          Tambah Instruktur
        </button>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Nomor Telpon
                </th>
                <th scope="col" className="px-6 py-3">
                  Opsi
                </th>
              </tr>
            </thead>
            <tbody>
              {dataInstructor && dataInstructor.length > 0 ? (
                dataInstructor.map((item) => (
                  <tr className="bg-white border-b " key={item.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">
                      {item.phone_number
                        ? item.phone_number
                        : "Belum menambahkan"}
                    </td>
                    <td className="px-6 py-4 ">
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 "
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b ">
                  <td>Tidak ada data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
