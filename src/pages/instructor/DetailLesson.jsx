import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import { setAlert, setLoading } from "../../redux/notificationReducer";
import { getDetailLessonTopics } from "../../services/instructor";

export default function DetailLesson() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.notification.loading);
  const confirm = useSelector((state) => state.notification.confirm);
  const alert = useSelector((state) => state.notification.alert);
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  useEffect(() => {
    dispatch(setLoading(true));
    getDetailLessonTopics(id, token)
      .then((response) => console.log("response", response))
      .catch((error) => console.log("error", error))
      .finally(() => dispatch(setLoading(false)));
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
        <h2 className="text-xl font-bold text-gray-900">
          Detail Materi Pembelajaran
        </h2>
        <div className="p-3 border rounded-lg">
          <h2 className="text-lg text-gray-900">
            {/* {topicsDetail && topicsDetail.title} */}
          </h2>
          <h2 className="text-base text-gray-900">
            {/* {topicsDetail && topicsDetail.description} */}
          </h2>
        </div>
      </div>
    </>
  );
}
