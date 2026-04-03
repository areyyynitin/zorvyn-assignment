export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export type ChartData = {
  date: string;
  income: number;
  expense: number;
}[];