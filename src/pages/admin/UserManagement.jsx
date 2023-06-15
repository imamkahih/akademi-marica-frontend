import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import ConfirmDialog from "../../components/ConfirmDialog";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import { setAlert, setLoading } from "../../redux/notificationReducer";
import { getAllUser } from "../../services/admin";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "../../components/PDFDocument";
import * as XLSX from "xlsx";

export default function UserManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm = useSelector((state) => state.notification.confirm);
  const isLoading = useSelector((state) => state.notification.loading);
  const alert = useSelector((state) => state.notification.alert);
  const token = useSelector((state) => state.user.token);
  const [students, setStudents] = useState(null);
  const [shouldUpdatePDF, setShouldUpdatePDF] = useState(false);
  const pdfRef = useRef();
  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}${month}${day}_${hours}${minutes}`;
  }
  const exportToExcel = () => {
    if (students) {
      const excelData = students.map((student) => {
        return {
          Nama: student.name,
          Email: student.email,
          "Nomor Telpon": student.phone_number || "Belum menambahkan",
        };
      });
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelFile = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelFile], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `user_list_${getFormattedDate()}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getAllUser(token)
      .then((response) => {
        setStudents(response.students);
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
        <h2 className="text-xl font-bold text-gray-900">Manajemen User</h2>
        <div className="flex gap-x-3">
          {students && shouldUpdatePDF && (
            <PDFViewer style={{ width: "100%", height: "600px" }}>
              <PDFDocument students={students} ref={pdfRef} />
            </PDFViewer>
          )}

          <PDFDownloadLink
            document={<PDFDocument students={students} />}
            fileName={`user_list_${getFormattedDate()}.pdf`}
          >
            {({ blob, url, loading, error }) => (
              <button
                className={`focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Loading document..." : "Export PDF"}
              </button>
            )}
          </PDFDownloadLink>
          <button
            className={`focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 `}
            onClick={() => exportToExcel()}
          >
            Export Excel
          </button>
        </div>
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
              </tr>
            </thead>
            <tbody>
              {students ? (
                students.map((item) => (
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
