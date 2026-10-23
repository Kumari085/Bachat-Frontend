
import { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#34D399",
  "#60A5FA",
  "#FBBF24",
  "#A78BFA",
  "#F472B6",
  "#FB923C",
  "#2DD4BF",
];

function formatMonth(month) {
  const [monthNumber, year] = month.split("-");

  return new Date(Number(year), Number(monthNumber) - 1)
    .toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
}

function DonutChart({
  title,
  MonthsReport = [],
  dataKey,
}) {
  const [selectedMonth, setSelectedMonth] = useState(
    MonthsReport[MonthsReport.length - 1]?.month ?? ""
  );

  const selectedReport = MonthsReport.find(
    (item) => item.month === selectedMonth
  );

  const expenseObject = selectedReport?.[dataKey] ?? {};

  const data = Object.entries(expenseObject).map(
    ([category, amount], index) => ({
      category,
      amount: Number(amount),
      color: COLORS[index % COLORS.length],
    })
  );

  const totalExpenses = data.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <section className="rounded-xl border border-[#25332E] bg-[#111816] p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        <select
          value={selectedMonth}
          onChange={(event) =>
            setSelectedMonth(event.target.value)
          }
          disabled={MonthsReport.length === 0}
          className="rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 py-2 text-sm text-white outline-none"
        >
          {MonthsReport.map((item) => (
            <option key={item.month} value={item.month}>
              {formatMonth(item.month)}
            </option>
          ))}
        </select>
      </div>

      {data.length === 0 ? (
        <div className="flex min-h-[250px] items-center justify-center text-sm text-gray-400">
          No expense data available for this month.
        </div>
      ) : (
        <div className="flex min-h-[250px] flex-col items-center justify-center gap-6 xl:flex-row">
          <div className="relative h-[220px] w-full max-w-[260px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={92}
                  paddingAngle={2}
                  stroke="none"
                >
                  {data.map((item) => (
                    <Cell
                      key={item.category}
                      fill={item.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                  contentStyle={{
                    backgroundColor: "#0B0F0E",
                    border: "1px solid #25332E",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-semibold text-white">
                ₹{totalExpenses.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-400">
                Total Expenses
              </span>
            </div>
          </div>

          <ul className="w-full max-w-[260px] space-y-3">
            {data.map((item) => (
              <li
                key={item.category}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2 text-gray-300">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate">
                    {item.category}
                  </span>
                </span>

                <span className="shrink-0 font-medium text-white">
                  ₹{item.amount.toLocaleString("en-IN")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default DonutChart;