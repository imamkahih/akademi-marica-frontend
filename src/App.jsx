import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardAdmin from "./pages/admin/Dashboard";
import InstructorManagement from "./pages/admin/InstructorManagement";
import DashboardInstructor from "./pages/instructor/Dashboard";
import CoursesManagement from "./pages/instructor/CoursesManagement";

const roleUser = localStorage.getItem("role");

export default function App() {
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
  if (roleUser === "1") {
    return <>{children}</>;
  } else if (roleUser === "2") {
    return <Navigate to={"/instructor"} />;
  } else {
    return <Navigate to={"/"} />;
  }
}

function InstructorElement({ children }) {
  if (roleUser === "2") {
    return <>{children}</>;
  } else if (roleUser === "1") {
    return <Navigate to={"/admin"} />;
  } else {
    return <Navigate to={"/"} />;
  }
}
