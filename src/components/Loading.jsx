import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading({ isLoading = false }) {
  return (
    <>
      <div
        className={`${
          isLoading ? "flex" : "hidden"
        } fixed inset-0 items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="animate-spin text-white text-4xl"
        />
      </div>
    </>
  );
}
