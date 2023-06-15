import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import { setAlert } from "../../redux/notificationReducer";
import { getLessonTopics, getTopicsDetail } from "../../services/instructor";

export default function DetailTopics() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.notification.loading);
  const confirm = useSelector((state) => state.notification.confirm);
  const alert = useSelector((state) => state.notification.alert);
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  const [topicsDetail, setTopicsDetail] = useState(null);
  const [lessonTopics, setLessonTopics] = useState(null);
  useEffect(() => {
    getTopicsDetail(id, token)
      .then((response) => {
        setTopicsDetail(response.data);
        getLessonTopics(id, token)
          .then((response) => console.log("response", response))
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
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
          Detail Topik Pembelajaran
        </h2>
        <div className="p-3 border rounded-lg">
          <h2 className="text-lg text-gray-900">
            {topicsDetail && topicsDetail.title}
          </h2>
          <h2 className="text-base text-gray-900">
            {topicsDetail && topicsDetail.description}
          </h2>
          {topicsDetail && topicsDetail.course.length > 0 ? (
            <div className="flex flex-col gap-y-3">
              {/* {topicsDetail.course.map((course) => (
                <div className="flex flex-row justify-between">
                  <h2 className="border-b text-gray-500">
                    <span className="text-gray-900">{topic.title}</span> (
                    {topic.lessons.length} pelajaran)
                  </h2>
                  <div className="flex space-x-1">
                    <Link to={`/instructor/courses/topics/${topic.id}`}>
                      <button
                        type="button"
                        className="focus:outline-none btn text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-2 text-sm text-center"
                      >
                        Lihat
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-3 text-xs text-center"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-3 text-xs"
                      onClick={() => {
                        handleDelete(topic.id);
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))} */}
            </div>
          ) : (
            <div className="">Belum menambahkan topik pembelajaran</div>
          )}
        </div>
      </div>
    </>
  );
}
