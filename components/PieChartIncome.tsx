"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useTransactionStore } from "@/store/useTransactionStore";

export function PieChartIncome() {
  const { transactions, fetchTransactions } = useTransactionStore();

  React.useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const chartData = React.useMemo(() => {
    const grouped: Record<string, number> = {};

    transactions
      .filter((t) => t.type === "income")
      .forEach((t) => {
        if (!grouped[t.category]) {
          grouped[t.category] = 0;
        }
        grouped[t.category] += t.amount;
      });

    return Object.entries(grouped).map(([category, amount], index) => ({
      category,
      amount,
      fill: `var(--chart-${(index % 5) + 1})`,
    }));
  }, [transactions]);

  const totalIncome = chartData.reduce((acc, curr) => acc + curr.amount, 0);

  const chartConfig = {
    amount: {
      label: "Amount",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Income Breakdown</CardTitle>
        <CardDescription>By Category</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => `₹ ${value}`}
                  hideLabel
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              stroke="0"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total Income: ₹ {totalIncome.toLocaleString()}
          <TrendingUp className="h-4 w-4 text-green-600" />
        </div>

        <div className="leading-none text-muted-foreground">
          Category-wise income distribution
        </div>
      </CardFooter>
    </Card>
  );
}