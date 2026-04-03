"use client";

import { useTransactionStore } from "@/store/useTransactionStore";
import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TransactionsTable() {
  const { transactions, fetchTransactions } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="rounded-2xl border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((txn) => (
              <TableRow key={txn.id}>
                {/* Date */}
                <TableCell>
                  {new Date(txn.date).toLocaleDateString("en-IN")}
                </TableCell>

                {/* Category */}
                <TableCell className="font-medium">
                  {txn.category}
                </TableCell>

                {/* Type */}
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs capitalize font-medium `}
                  >
                    {txn.type}
                  </span>
                </TableCell>

                {/* Amount */}
                <TableCell className="text-right font-semibold">
                  <span
                    className={
                      txn.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    ₹ {txn.amount.toLocaleString()}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}