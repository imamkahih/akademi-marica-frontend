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
export const updateCourses = async (id, data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/courses/${id}`, data, {
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

export const getTopicsDetail = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/course-topics/` + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const postTopics = async (data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/course-topics`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const updateTopics = async (id, data, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/course-topics/` + id, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteTopics = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/course-topics/` + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getLessonTopics = async (id, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/course-lessons/topic/` + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const postLessonTopics = async (data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/course-lessons`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteLessonTopics = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/course-lessons/` + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
