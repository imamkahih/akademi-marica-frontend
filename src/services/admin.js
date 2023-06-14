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

export const postInstructor = async (values, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/manage-instructors`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error", error.response.data);
    return error.response.data;
  }
};

export const deleteInstructor = async (id, token) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/manage-instructors/` + id,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllUser = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/all-user`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
