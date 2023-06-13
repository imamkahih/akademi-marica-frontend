import axios from "axios";
import { BASE_URL } from "./config";

export const getCourses = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/mycourses`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getCoursesDetail = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/` + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const postCourses = async (data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/courses`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteCourses = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/courses/` + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getCategories = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
