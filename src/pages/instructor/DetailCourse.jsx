import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import YouTubePlayer from "../../components/YoutubePlayer";
import {
  closeConfirm,
  openConfirm,
  setAlert,
  setLoading,
} from "../../redux/notificationReducer";
import { deleteTopics, getCoursesDetail } from "../../services/instructor";

export default function DetailCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.notification.loading);
  const confirm = useSelector((state) => state.notification.confirm);
  const alert = useSelector((state) => state.notification.alert);
  const token = useSelector((state) => state.user.token);
  const [courseDetail, setCourseDetail] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    dispatch(setLoading(true));
    getCoursesDetail(id, token)
      .then((response) => {
        setCourseDetail(response.data);
        setVideoUrl(response.data.teaser_url);
      })
      .catch((error) => console.log("error", error))
      .finally(() => dispatch(setLoading(false)));
  }, []);
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
  const handleAdd = (id) => {
    navigate("/instructor/courses/topics/add", { state: { id: id } });
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
    deleteTopics(id, token)
      .then((response) => {
        if (response.status === 200) {
          getCoursesDetail(id, token)
            .then((response) => {
              setCourseDetail(response.data);
              setVideoUrl(response.data.teaser_url);
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
        <h2 className="text-xl font-bold text-gray-900">Detail Kursus</h2>
        <div className="flex flex-col-reverse gap-y-5 md:flex-row md:gap-x-5">
          <div className="w-full md:w-7/12 flex flex-col gap-y-3 border p-3 rounded-xl">
            <h2 className="text-2xl text-gray-900">
              {courseDetail && courseDetail.course_name}
            </h2>
            <h2 className="text-base text-gray-900">
              {courseDetail && courseDetail.category.category_name}
            </h2>
            <h2 className="text-base text-gray-900">
              {courseDetail && courseDetail.instructor_name.name}
            </h2>
            <h2 className="text-base text-gray-900">
              {courseDetail && courseDetail.price}
            </h2>
            <h2 className="text-base text-gray-900">
              {courseDetail && courseDetail.course_description
                ? courseDetail.course_description
                : "Belum menambahkan deskripsi kursus"}
            </h2>
          </div>
          <div className="w-full md:w-5/12 flex flex-col items-center gap-y-3 border p-3 rounded-xl">
            <img
              className="w-auto h-auto max-w-xs"
              src={courseDetail && courseDetail.thumbnail}
              alt="thumbnail"
            />
            <YouTubePlayer videoId={videoId} />
          </div>
        </div>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Topik Pembelajaran
          </h2>
          <button
            type="button"
            className="focus:outline-none btn text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3 py-2 text-sm text-center"
            onClick={() => handleAdd(courseDetail.id)}
          >
            Tambah Topik
          </button>
        </div>
        <div className="flex flex-col justify-between">
          {courseDetail && courseDetail.topics.length > 0 ? (
            <div className="flex flex-col gap-y-3">
              {courseDetail.topics.map((topic) => (
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
                    <Link to={`/instructor/courses/topics/edit/${topic.id}`}>
                      <button
                        type="button"
                        className="focus:outline-none btn text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg px-3 py-2 text-sm text-center"
                      >
                        Edit
                      </button>
                    </Link>
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
              ))}
            </div>
          ) : (
            <div className="">Belum menambahkan topik pembelajaran</div>
          )}
        </div>
      </div>
    </>
  );
}
