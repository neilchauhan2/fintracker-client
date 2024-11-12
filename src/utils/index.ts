import dayjs from "dayjs";
import { LineChartDataType, PieChartDataType, Transaction } from "../types";

export function getLineChartData(
  transactions: Transaction[]
): LineChartDataType[] {
  const data = transactions.map((transaction) => {
    return {
      income:
        transaction.type.trim().toLocaleLowerCase() === "income"
          ? transaction.amount
          : 0,
      expense:
        transaction.type.trim().toLocaleLowerCase() === "expense"
          ? transaction.amount * -1
          : 0,
      date: dayjs(transaction.date).format("DD/MM/YY"),
    };
  });
  return data;
}

export function getPieChartData(
  transactions: Transaction[]
): PieChartDataType[] {
  const categories = new Map<string, number>();
  transactions.forEach((transaction) => {
    if (categories.has(transaction.category)) {
      const curValue = categories.get(transaction.category) || 0;
      categories.set(
        transaction.category,
        Math.floor(curValue + transaction.amount)
      );
    } else {
      categories.set(transaction.category, transaction.amount);
    }
  });

  return Array.from(categories).map(([key, value]) => ({
    name: key,
    value,
  }));
}

export const getTotalTransactions = (transactions: Transaction[]) =>
  transactions.length;
export const getTotalIncome = (transactions: Transaction[]) =>
  Math.floor(
    transactions
      .filter((t) => t.type.trim().toLocaleLowerCase() === "income")
      .reduce((sum, t) => sum + t.amount, 0)
  );
export const getTotalExpenses = (transactions: Transaction[]) =>
  Math.floor(
    transactions
      .filter((t) => t.type.trim().toLocaleLowerCase() === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
  );
