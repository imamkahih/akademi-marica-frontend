import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import YouTubePlayer from "../../components/YoutubePlayer";
import { setAlert, setLoading } from "../../redux/notificationReducer";
import { getDetailLessonTopics } from "../../services/instructor";

export default function DetailLesson() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.notification.loading);
  const confirm = useSelector((state) => state.notification.confirm);
  const alert = useSelector((state) => state.notification.alert);
  const token = useSelector((state) => state.user.token);
  const [lessonDetail, setLessonDetail] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const { id } = useParams();
  const videoId = videoUrl ? getYouTubeVideoId(videoUrl) : null;
  function getYouTubeVideoId(url) {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    let match = url.match(regExp);
    if (match && match[2]) {
      return match[2];
    } else {
      return null;
    }
  }
  useEffect(() => {
    dispatch(setLoading(true));
    getDetailLessonTopics(id, token)
      .then((response) => {
        console.log("response", response.data);
        setLessonDetail(response.data);
        setVideoUrl(response.data.content);
      })
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
            Nama Materi : {lessonDetail && lessonDetail.title}
          </h2>
          <h2 className="text-base text-gray-900">
            Jenis Materi : {lessonDetail && lessonDetail.content_type}
          </h2>
          <h2 className="text-base text-gray-900">
            Deskripsi Materi : {lessonDetail && lessonDetail.description}
          </h2>
          <h2 className="text-base text-gray-900">
            Isi Materi :{" "}
            {lessonDetail &&
              lessonDetail.content_type === "pdf" &&
              lessonDetail.content && (
                <Link to={lessonDetail.content} target="_blank">
                  <h1 className="text-blue-500 hover:text-blue-600">
                    Buka PDF di Tab Baru
                  </h1>
                </Link>
              )}
            {lessonDetail &&
              lessonDetail.content_type === "text" &&
              lessonDetail.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: lessonDetail && lessonDetail.content,
                  }}
                ></div>
              )}
            {lessonDetail &&
              lessonDetail.content_type === "video" &&
              lessonDetail.content && <YouTubePlayer videoId={videoId} />}
          </h2>
        </div>
      </div>
    </>
  );
}
