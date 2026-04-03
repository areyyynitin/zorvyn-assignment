"use client";

import { create } from "zustand";

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

type ChartItem = {
  date: string;
  income: number;
  expense: number;
};

type Role = "viewer" | "admin";

type Store = {
  transactions: Transaction[];
  chartData: ChartItem[];

  totalIncome: number;
  totalExpense: number;
  totalBalance: number;

  role: Role;
  setRole: (role: Role) => void;

  fetchTransactions: () => Promise<void>;
  addTransaction: (txn: Transaction) => void;
};

const calculateSummary = (txns: Transaction[]) => {
  const income = txns
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = txns
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  return {
    totalIncome: income,
    totalExpense: expense,
    totalBalance: income - expense,
  };
};

const generateChartData = (txns: Transaction[]): ChartItem[] => {
  const grouped: Record<string, ChartItem> = {};

  txns.forEach((t) => {
    const dateKey = new Date(t.date).toISOString().split("T")[0];

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: dateKey,
        income: 0,
        expense: 0,
      };
    }

    grouped[dateKey][t.type] += t.amount;
  });

  return Object.values(grouped).sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  );
};
export const useTransactionStore = create<Store>((set, get) => ({
  transactions: [],
  chartData: [],

  totalIncome: 0,
  totalExpense: 0,
  totalBalance: 0,

  role: "viewer",

  setRole: (role) => set({ role }),

  fetchTransactions: async () => {
    try {
      const res = await fetch("/api/transactions");

      if (!res.ok) {
        console.error("Failed to fetch transactions");
        return;
      }

      const data = await res.json();
      const txns: Transaction[] = data?.data || [];

      const summary = calculateSummary(txns);
      const chartData = generateChartData(txns);

      set({
        transactions: txns,
        chartData,
        ...summary,
      });
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  },

  addTransaction: (txn) => {
    const current = get().transactions;
    const updated = [...current, txn];

    const summary = calculateSummary(updated);
    const chartData = generateChartData(updated);

    set({
      transactions: updated,
      chartData,
      ...summary,
    });
  },
}));