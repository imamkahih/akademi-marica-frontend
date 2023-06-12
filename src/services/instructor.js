import axios from "axios";
import { BASE_URL } from "./config";

export const getCourses = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
