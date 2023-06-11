import { useSelector } from "react-redux";
import ConfirmDialog from "../../components/ConfirmDialog";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  const confirm = useSelector((state) => state.notification.confirm);
  return (
    <>
      <Sidebar />
      <ConfirmDialog
        show={confirm.show}
        message={confirm.message}
        handleConfirm={confirm.confirm}
      />
      <div className="p-4 sm:ml-64">
        <h1>Admin Page</h1>
      </div>
    </>
  );
}
