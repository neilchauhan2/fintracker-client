import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getSpaces = async () => {
  const response = await api.get("/api/spaces");
  return response.data;
};

export const createSpace = async (title: string) => {
  const response = await api.post("/api/spaces", { title });
  return response.data;
};

export const fetchTransactions = async (spaceId: string) => {
  const response = await api.get(`/api/spaces/${spaceId}/transactions`);
  return response.data;
};
