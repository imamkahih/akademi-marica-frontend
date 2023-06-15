import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardAdmin from "./pages/admin/Dashboard";
import InstructorManagement from "./pages/admin/InstructorManagement";
import AddInstructor from "./pages/admin/AddInstructor";
import DashboardInstructor from "./pages/instructor/Dashboard";
import CoursesManagement from "./pages/instructor/CoursesManagement";
import AddCourse from "./pages/instructor/AddCourse";
import DetailCourse from "./pages/instructor/DetailCourse";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/userReducer";
import AddTopics from "./pages/instructor/AddTopics";
import DetailTopics from "./pages/instructor/DetailTopics";
import UserManagement from "./pages/admin/UserManagement";
import EditCourse from "./pages/instructor/EditCourse";
import EditTopics from "./pages/instructor/EditTopics";

const roleUser = localStorage.getItem("role");
const tokenUser = localStorage.getItem("token");

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (roleUser && tokenUser) {
      dispatch(loginSuccess({ role: roleUser, token: tokenUser }));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/admin"
          element={
            <AdminElement>
              <DashboardAdmin />
            </AdminElement>
          }
        />
        <Route
          path="/admin/instructor"
          element={
            <AdminElement>
              <InstructorManagement />
            </AdminElement>
          }
        />
        <Route
          path="/admin/instructor/add"
          element={
            <AdminElement>
              <AddInstructor />
            </AdminElement>
          }
        />
        <Route
          path="/admin/user"
          element={
            <AdminElement>
              <UserManagement />
            </AdminElement>
          }
        />
        <Route
          path="/instructor"
          element={
            <InstructorElement>
              <DashboardInstructor />
            </InstructorElement>
          }
        />
        <Route
          path="/instructor/courses"
          element={
            <InstructorElement>
              <CoursesManagement />
            </InstructorElement>
          }
        />
        <Route
          path="/instructor/courses/:id"
          element={
            <InstructorElement>
              <DetailCourse />
            </InstructorElement>
          }
        />
        <Route
          path="/instructor/courses/add"
          element={
            <InstructorElement>
              <AddCourse />
            </InstructorElement>
          }
        />
        <Route
          path="/instructor/courses/edit/:id"
          element={
            <InstructorElement>
              <EditCourse />
            </InstructorElement>
          }
        />
        <Route
          path="/instructor/courses/topics/:id"
          element={
            <InstructorElement>
              <DetailTopics />
            </InstructorElement>
          }
        />
        <Route
          path="/instructor/courses/topics/edit/:id"
          element={
            <InstructorElement>
              <EditTopics />
            </InstructorElement>
          }
        />
        <Route
          path="/instructor/courses/topics/add"
          element={
            <InstructorElement>
              <AddTopics />
            </InstructorElement>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function AdminElement({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token && role === "1") {
    return <>{children}</>;
  } else if (token && role === "2") {
    return <Navigate to={"/instructor"} />;
  } else {
    return <Navigate to={"/"} />;
  }
}

function InstructorElement({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token && role === "2") {
    return <>{children}</>;
  } else if (token && role === "1") {
    return <Navigate to={"/admin"} />;
  } else {
    return <Navigate to={"/"} />;
  }
}
