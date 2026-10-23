import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";



function MonthlyChart({MonthsReport}) {
 

    // 1. Prepare actual API data
    const data = MonthsReport.map((item) => {
        const [month, year] = item.month.split("-");

        return {
            ...item,
            month: new Date(
                Number(year),
                Number(month) - 1
            ).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
            }),
        };
    });



  
  return (
    <div className="w-full mt-7 rounded-xl border border-[#25332E] bg-[#111816] p-4">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Monthly Income, Expenses & Savings
      </h2>

      <ResponsiveContainer width="80%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#25332E" vertical={false} />

          <XAxis
            dataKey="month"
            tick={{ fill: "#B0BDB7", fontSize: 12 }}
            axisLine={{ stroke: "#25332E" }}
            tickLine={false}
          />

          <YAxis
            tickFormatter={(value) => `₹${value / 1000}k`}
            tick={{ fill: "#B0BDB7", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={50}
          />

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString("en-IN")}`,
            ]}
            contentStyle={{
              backgroundColor: "#0B0F0E",
              border: "1px solid #25332E",
              borderRadius: "8px",
              color: "#FFFFFF",
            }}
          />

          <Legend wrapperStyle={{ color: "#B0BDB7", fontSize: 12 }} />

          <Bar
            dataKey="income"
            name="Income"
            fill="#34D399"
            radius={[3, 3, 0, 0]}
          />

          <Bar
            dataKey="expense"
            name="Expense"
            fill="#F472B6"
            radius={[3, 3, 0, 0]}
          />

          <Bar
            dataKey="savings"
            name="Savings"
            fill="#60A5FA"
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;