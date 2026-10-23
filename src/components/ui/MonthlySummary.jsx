
// const report = {
//   month: "10-2026",
//   income: 90000,
//   expense: 2810,
//   savings: 87190,
//   savingPercentage: 96.88,
//   totalTransactionsInMonth: 9,

//   // Dummy trends compared with September
//   MonthlyIncomeTrend: {
//     value: "increases",
//     trend: 125,
//   },
//   MonthlyExpenseTrend: {
//     value: "decreases",
//     trend: 89.63,
//   },
//   MonthlySavingTrend: {
//     value: "increases",
//     trend: 575.89,
//   },
// };

function MonthlySummary({report}) {
  const income = report.income;
  const expenses = report.expense;
  const savings = report.savings;
  const savingRate = report.savingPercentage;

  const formatMoney = (value) =>
    `₹${value.toLocaleString("en-IN")}`;

  const trends = [
    { label: "Income", data: report.MonthlyIncomeTrend },
    { label: "Expenses", data: report.MonthlyExpenseTrend },
    { label: "Savings", data: report.MonthlySavingTrend },
  ];

  return (
    <div className="rounded-xl border border-[#25332E] bg-[#081311] p-4 text-white">
      {/* Month and saving rate */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#25332E] pb-3">
        <h2 className="text-sm font-medium">Oct 2026</h2>

        <span className="rounded-full border border-emerald-900 bg-emerald-950/60 px-3 py-1 text-xs text-emerald-200">
          Saving Rate: {savingRate.toFixed(2)}%
        </span>
      </div>

      {/* Financial summary */}
      <div className="grid grid-cols-3 gap-3 py-4">
        <div className="min-w-0 border-r border-[#25332E]">
          <p className="text-sm text-gray-400">Income</p>
          <p className="mt-1 break-words text-lg font-semibold text-emerald-400">
            {formatMoney(income)}
          </p>
        </div>

        <div className="min-w-0 border-r border-[#25332E]">
          <p className="text-sm text-gray-400">Expenses</p>
          <p className="mt-1 break-words text-lg font-semibold text-pink-400">
            {formatMoney(expenses)}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-sm text-gray-400">Savings</p>
          <p className="mt-1 break-words text-lg font-semibold text-blue-400">
            {formatMoney(savings)}
          </p>
        </div>
      </div>

      {/* Saving rate progress bar */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#25332E]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
          style={{
            width: `${Math.min(100, Math.max(0, savingRate))}%`,
          }}
        />
      </div>

      {/* Previous-month trends */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {trends.map(({ label, data }) => {
          const isNew = data.value === "new";
          const isIncrease = data.value === "increases";

          const color = isNew
            ? "text-gray-400"
            : label === "Expenses"
              ? isIncrease
                ? "text-pink-400"
                : "text-emerald-400"
              : isIncrease
                ? "text-emerald-400"
                : "text-pink-400";

          return (
            <div
              key={label}
              className="rounded-lg border border-[#25332E] p-3"
            >
              <p className="text-xs text-gray-400">
                {label} vs previous month
              </p>

              <p className={`mt-1 text-sm font-semibold ${color}`}>
                {isNew
                  ? "No previous data"
                  : `${isIncrease ? "↑" : "↓"} ${data.trend.toFixed(2)}%`}
              </p>
            </div>
          );
        })}
      </div>

      {/* Transaction count */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
        <span aria-hidden="true">▤</span>
        <span>{report.totalTransactionsInMonth} transactions</span>
      </div>
    </div>
  );
}

export default MonthlySummary;