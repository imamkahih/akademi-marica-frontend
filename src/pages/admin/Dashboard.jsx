import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <h1>Admin Page</h1>
      </div>
    </>
  );
}
