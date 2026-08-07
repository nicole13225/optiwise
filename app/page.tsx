"use client";

import { useState } from "react";

export default function Home() {
  const [strategy, setStrategy] = useState<"call" | "put">("call");
  const [strike, setStrike] = useState("100");
const [premium, setPremium] = useState("3");
const [stockPrice, setStockPrice] = useState("105");
const [contracts, setContracts] = useState("1");

const strikeNumber = Number(strike) || 0;
const premiumNumber = Number(premium) || 0;
const stockPriceNumber = Number(stockPrice) || 0;
const contractsNumber = Number(contracts) || 0;

const intrinsicValue =
  strategy === "call"
    ? Math.max(0, stockPriceNumber - strikeNumber)
    : Math.max(0, strikeNumber - stockPriceNumber);

const profitLoss =
  (intrinsicValue - premiumNumber) * 100 * contractsNumber;

const breakEven =
  strategy === "call"
    ? strikeNumber + premiumNumber
    : strikeNumber - premiumNumber;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 text-gray-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold tracking-tight">OptiWise</h1>
          <p className="mt-3 text-lg text-gray-500">
            Learn. Plan. Trade.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">
              Option Calculator
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Strategy
                </label>
                <select
                  value={strategy}
                  onChange={(event) =>
                    setStrategy(event.target.value as "call" | "put")
                  }
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                >
                  <option value="call">Long Call</option>
                  <option value="put">Long Put</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Strike Price
                </label>
                <input
                  type="number"
                  value={strike}
                  onChange={(event) => setStrike(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Premium per Share
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={premium}
                  onChange={(event) => setPremium(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Stock Price at Expiration
                </label>
                <input
                  type="number"
                  value={stockPrice}
                  onChange={(event) =>
                    setStockPrice(event.target.value)
                  }
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Contracts
                </label>
                <input
                  type="number"
                  min="1"
                  value={contracts}
                  onChange={(event) =>
                    setContracts(event.target.value)
                  }
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">
              Results
            </h2>

            <div className="space-y-4">
              <ResultCard
                label="Break-even"
                value={`$${breakEven.toFixed(2)}`}
              />

              <ResultCard
                label="Intrinsic Value"
                value={`$${intrinsicValue.toFixed(2)}`}
              />

              <ResultCard
                label="Maximum Loss"
                value={`$${(premiumNumber * 100 * contractsNumber).toFixed(2)}`}
              />

              <div
                className={`rounded-2xl p-5 ${
                  profitLoss >= 0
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <p className="text-sm font-medium">
                  Profit / Loss at Expiration
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {profitLoss >= 0 ? "+" : ""}
                  ${profitLoss.toFixed(2)}
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-5 text-blue-800">
                <p className="font-semibold">What does this mean?</p>
                <p className="mt-2 text-sm leading-6">
                  Your option begins making a profit at expiration when the
                  stock moves beyond the break-even price. Your maximum loss
                  is limited to the premium paid.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-gray-100 p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}