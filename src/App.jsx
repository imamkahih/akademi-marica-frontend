import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardAdmin from "./pages/admin/Dashboard";
import InstructorManagement from "./pages/admin/InstructorManagement";
import DashboardInstructor from "./pages/instructor/Dashboard";
import CoursesManagement from "./pages/instructor/CoursesManagement";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./redux/userReducer";

const roleUser = localStorage.getItem("role");
const tokenUser = localStorage.getItem("token");

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function AdminElement({ children }) {
  const token = useSelector((state) => state.user.token);
  const role = useSelector((state) => state.user.role);
  if (token && role === "1") {
    return <>{children}</>;
  } else if (token && role === "2") {
    return <Navigate to={"/instructor"} />;
  } else {
    return <Navigate to={"/"} />;
  }
}

function InstructorElement({ children }) {
  const token = useSelector((state) => state.user.token);
  const role = useSelector((state) => state.user.role);
  if (token && role === "2") {
    return <>{children}</>;
  } else if (token && role === "1") {
    return <Navigate to={"/admin"} />;
  } else {
    return <Navigate to={"/"} />;
  }
}
