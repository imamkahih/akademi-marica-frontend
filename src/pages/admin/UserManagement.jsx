import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import { setAlert } from "../../redux/notificationReducer";
import { getAllUser } from "../../services/admin";

export default function UserManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm = useSelector((state) => state.notification.confirm);
  const isLoading = useSelector((state) => state.notification.loading);
  const alert = useSelector((state) => state.notification.alert);
  const token = useSelector((state) => state.user.token);
  const [students, setStudents] = useState(null);
  useEffect(() => {
    getAllUser(token)
      .then((response) => {
        console.log("response", response);
        setStudents(response.students);
      })
      .catch((error) => console.log("error", error))
      .finally(() => console.log("students", students));
  }, []);

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
        <h2 className="text-xl font-bold  text-gray-900">Manajemen User</h2>
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
                  Opsi
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {dataInstructor ? (
                dataInstructor.map((item) => (
                  <tr className="bg-white border-b " key={item.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4 ">
                      <div className="space-x-3">
                        <button
                          type="button"
                          className="focus:outline-none btn text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-3 py-2 text-sm text-center "
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 "
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b ">
                  <td>Tidak ada data</td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
