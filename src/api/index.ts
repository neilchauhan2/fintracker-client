import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getSpaces = async () => {
  const response = await api.get("/api/spaces");
  return response.data;
};
