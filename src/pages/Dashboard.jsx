import { useState, useEffect } from 'react'
import { Goal, Wallet, CircleDollarSign, ChartNoAxesCombined } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDashboard } from '../hooks/useDashboard'






function Dashboard() {

    const { dashboardData, loading, error, fetchDashboard } = useDashboard()

  const today = new Date()

const [month, setMonth] = useState(today.getMonth() + 1)
const [year, setYear] = useState(today.getFullYear())

  useEffect(() => {
    fetchDashboard(month, year)
  }, [])

if (loading || !dashboardData) {
  return <div>Loading dashboard...</div>
}

if (error) {
  return <div>Failed to load dashboard.</div>
}

const totalExpense = dashboardData.totalExpense

  return (
    <main className="min-h-[calc(100vh-4rem)] w-full bg-[#0B0F0E] px-6 py-6 text-[#F5F5F5]">

      {/* Dashboard heading and month/year */}

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-semibold">
          Dashboard
        </h1>

        <div className="flex gap-3">

          {/* Month */}

          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="rounded-lg border border-[#25332E] bg-[#111816] px-3 py-2"
          >
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>

          {/* Year */}

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="rounded-lg border border-[#25332E] bg-[#111816] px-3 py-2"
          >
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
          </select>

          <button
  onClick={() => fetchDashboard(month, year)}
  disabled={loading}
  className="rounded-lg bg-emerald-500 px-4 py-2 text-black"
>
  {loading ? 'Loading...' : 'View Dashboard'}
</button>

        </div>

      </div>


      {/* Summary */}

      <div className="mt-6 grid grid-cols-3 gap-4">

        {/* Income */}

        <div className="rounded-xl border border-[#25332E] bg-[#111816] p-5">

          <Wallet />

          <p className="mt-3 text-[#9AA9A2]">
            Total Income
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            ₹{dashboardData.totalIncome}
          </h2>

        </div>


        {/* Expense */}

        <div className="rounded-xl border border-[#25332E] bg-[#111816] p-5">

          <CircleDollarSign />

          <p className="mt-3 text-[#9AA9A2]">
            Total Expense
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            ₹{dashboardData.totalExpense}
          </h2>

        </div>


        {/* Savings */}

        <div className="rounded-xl border border-[#25332E] bg-[#111816] p-5">

          <ChartNoAxesCombined />

          <p className="mt-3 text-[#9AA9A2]">
            Total Savings
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            ₹{dashboardData.totalSavings}
          </h2>

        </div>

      </div>


      {/* Expenses by Category */}

      <div className="mt-6 rounded-xl border border-[#25332E] bg-[#111816] p-5">

        <h2 className="text-xl font-semibold">
          Expenses by Category
        </h2>

        <div className="mt-5 space-y-4">

          {Object.entries(dashboardData.expenseByCategory).map(
            ([category, amount]) => {

              const percentage = (amount / totalExpense) * 100

              return (

                <div key={category}>

                  <div className="flex justify-between">

                    <span>
                      {category}
                    </span>

                    <span>
                      ₹{amount}
                    </span>

                  </div>

                  <div className="mt-2 h-2 rounded-full bg-[#25332E]">

                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{
                        width: `${percentage}%`
                      }}
                    />

                  </div>

                </div>

              )
            }
          )}

        </div>

      </div>


      {/* Goals */}

      <div className="mt-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Goal />

            <h2 className="text-xl font-semibold">
              Your Goals
            </h2>

          </div>


          <Link
            to="/goal"
            className="text-emerald-300"
          >
            All Goals →
          </Link>

        </div>


        <div className="mt-4 grid grid-cols-3 gap-4">

          {dashboardData.goals.map((goal) => (

            <div
              key={goal._id}
              className="rounded-xl border border-[#25332E] bg-[#111816] p-5"
            >

              <h3 className="text-lg font-medium">
                {goal.name}
              </h3>


              <p className="mt-3">
                ₹{goal.currentAmount} / ₹{goal.targetAmount}
              </p>


              <p className="mt-2 text-sm text-[#9AA9A2]">
                {goal.progressPercentage}% — {goal.status}
              </p>


              <div className="mt-3 h-2 rounded-full bg-[#25332E]">

                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{
                    width: `${goal.progressPercentage}%`
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}

export default Dashboard