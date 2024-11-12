import axios from "axios";
import { TransactionPayload } from "../types";

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

export const createTransaction = async (
  spaceId: string,
  transaction: TransactionPayload
) => {
  const response = await api.post(
    `/api/spaces/${spaceId}/transactions`,
    transaction
  );
  return response.data;
};

export const updateTransaction = async (
  spaceId: string,
  transactionId: string,
  transaction: TransactionPayload
) => {
  const response = await api.put(
    `/api/spaces/${spaceId}/transactions/${transactionId}`,
    transaction
  );
  return response.data;
};

export const deleteTransaction = async (
  spaceId: string,
  transactionId: string
) => {
  const response = await api.delete(
    `/api/spaces/${spaceId}/transactions/${transactionId}`
  );
  return response.data;
};
