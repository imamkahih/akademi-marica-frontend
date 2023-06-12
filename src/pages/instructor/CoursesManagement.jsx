import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import Sidebar from "../../components/Sidebar";

export default function CoursesManagement() {
  const dispatch = useDispatch();
  const confirm = useSelector((state) => state.notification.confirm);
  const alert = useSelector((state) => state.notification.alert);
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
      <div className="p-4 sm:ml-64">
        <h1>Courses Manajement Page</h1>
      </div>
    </>
  );
}
