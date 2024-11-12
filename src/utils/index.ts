import dayjs from "dayjs";
import { LineChartDataType, Transaction } from "../types";

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
