import { faCircleCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Alert({ type, show, message, setShow, withTimeout }) {
  const [color, setColor] = useState("");
  const [classColor, setClassColor] = useState("");
  useEffect(() => {
    if (withTimeout) {
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [show]);
  useEffect(() => {
    switch (type) {
      case "success":
        setClassColor("text-green-500 bg-green-50 border-green-500");
        setColor("green");
        break;
      case "info":
        setClassColor("text-blue-500 bg-blue-50 border-blue-500");
        setColor("blue");
        break;
      case "warning":
        setClassColor("text-yellow-500 bg-yellow-50 border-yellow-500");
        setColor("yellow");
        break;
      case "error":
        setClassColor("text-red-500 bg-red-50 border-red-500");
        setColor("red");
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <>
      <div
        className={`${
          show ? "flex" : "hidden"
        }  fixed inset-x-0 top-0 items-center justify-center mt-7`}
      >
        <div className="w-auto">
          <div
            className={`${classColor} flex p-3 text-sm  border rounded-lg`}
            role="alert"
          >
            <span className="sr-only">{type}</span>
            <div>{message}</div>
          </div>
        </div>
      </div>
    </>
  );
}
