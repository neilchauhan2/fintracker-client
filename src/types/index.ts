export type Transaction = {
  id: string;
  spaceId: string;
  description: string;
  amount: number;
  date: string;
  type: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};
export type TransactionPayload = {
  description: string;
  amount: number | null;
  date: string;
  type: string;
  category: string;
};

export type LineChartDataType = {
  income: number;
  expense: number;
  date: string;
};
