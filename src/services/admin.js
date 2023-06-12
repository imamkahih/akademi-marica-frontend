import axios from "axios";
import { BASE_URL } from "./config";

export const getInstructor = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/manage-instructors`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
