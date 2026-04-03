import { NextResponse } from "next/server";
import { transactions } from "@/lib/data";
import { Transaction } from "@/types/transaction";

// 👀 VIEWER → GET
export async function GET() {
  return NextResponse.json({
    success: true,
    data: transactions,
  });
}

// 🔐 ADMIN → POST
export async function POST(req: Request) {
  const isAdmin = req.headers.get("x-admin") === "true";

  if (!isAdmin) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await req.json();

  const nextId =
    transactions.length > 0
      ? (parseInt(transactions[transactions.length - 1].id) + 1).toString()
      : "1";

  const newTransaction = {
    id: nextId,
    date: body.date,
    amount: body.amount,
    category: body.category,
    type: body.type,
  };

  transactions.push(newTransaction);

  return new Response(
    JSON.stringify({ success: true, data: newTransaction }),
    { status: 201 }
  );
}