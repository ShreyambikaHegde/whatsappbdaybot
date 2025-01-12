import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Your FastAPI backend URL


export const scheduleMessage = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send-message/`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || error.message;
  }
};
