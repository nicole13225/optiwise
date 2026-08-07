"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

type Strategy =
  | "longCall"
  | "longPut"
  | "shortCall"
  | "shortPut";

type PayoffChartProps = {
  strategy: Strategy;
  strike: number;
  premium: number;
  contracts: number;
};

export default function PayoffChart({
  strategy,
  strike,
  premium,
  contracts,
}: PayoffChartProps) {
  const multiplier = 100 * contracts;

  const data = Array.from({ length: 41 }, (_, index) => {
    const minPrice = Math.max(0, strike * 0.5);
    const maxPrice = strike * 1.5;
    const price =
      minPrice + ((maxPrice - minPrice) / 40) * index;

    const callIntrinsic = Math.max(0, price - strike);
    const putIntrinsic = Math.max(0, strike - price);

    let profitLoss = 0;

    if (strategy === "longCall") {
      profitLoss = (callIntrinsic - premium) * multiplier;
    }

    if (strategy === "longPut") {
      profitLoss = (putIntrinsic - premium) * multiplier;
    }

    if (strategy === "shortCall") {
      profitLoss = (premium - callIntrinsic) * multiplier;
    }

    if (strategy === "shortPut") {
      profitLoss = (premium - putIntrinsic) * multiplier;
    }

    return {
      price: Number(price.toFixed(2)),
      profitLoss: Number(profitLoss.toFixed(2)),
    };
  });

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">
        Payoff Chart
      </h2>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="price"
              label={{
                value: "Stock Price at Expiration",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis />
            <Tooltip
              formatter={(value) => [
                `$${Number(value).toFixed(2)}`,
                "Profit / Loss",
              ]}
              labelFormatter={(label) =>
                `Stock Price: $${Number(label).toFixed(2)}`
              }
            />

            <ReferenceLine y={0} stroke="#6b7280" />

            <ReferenceLine
              x={strike}
              stroke="#2563eb"
              strokeDasharray="5 5"
              label="Strike"
            />

            <Line
              type="monotone"
              dataKey="profitLoss"
              stroke="#16a34a"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}