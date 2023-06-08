import axios from "axios";
import { BASE_URL } from "./config";

export const postLogin = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
