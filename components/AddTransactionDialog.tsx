"use client";

import * as React from "react";
import { useTransactionStore } from "@/store/useTransactionStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddTransactionDialog() {
  const { role, setRole, addTransaction } = useTransactionStore();

  const [open, setOpen] = React.useState(false);

  const [form, setForm] = React.useState({
    amount: "",
    category: "",
    type: "income",
  });

  const handleSubmit = () => {
    if (role !== "admin") return;

    const newTxn = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount: Number(form.amount),
      category: form.category,
      type: form.type as "income" | "expense",
    };

    addTransaction(newTxn);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Transaction</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Role</p>

          <Select value={role} onValueChange={(v) => setRole(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="viewer">Viewer</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

     
        <div className="space-y-4 mt-4">
          <Input
            placeholder="Amount"
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            disabled={role !== "admin"}
          />

          <Input
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            disabled={role !== "admin"}
          />

          <Select
            value={form.type}
            onValueChange={(v) =>
              setForm({ ...form, type: v })
            }
            disabled={role !== "admin"}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={role !== "admin"}
          >
            {role === "admin" ? "Add Transaction" : "Viewer Mode"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}