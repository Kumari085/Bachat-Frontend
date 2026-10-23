import {CircleArrowUp,CircleArrowDown,PiggyBank,ScanLine} from 'lucide-react'
import MonthlyChart from '../components/ui/MonthlyChart'
import DonutChart from '../components/ui/DonutChart'
import MonthlySummary from '../components/ui/MonthlySummary'
import { useReport } from '../hooks/useReport'
import { useEffect, useState } from 'react'


function Reports() {

const {report,error,loading,fetchReport} = useReport();
// const today = new Date();
const [startMonth,setStartMonth]=useState('1');
const [startYear,setStartYear]=useState('2026');
const [endMonth,setEndMonth]=useState('12');
const [endYear,setEndYear]=useState('2026');

const handleSelect = () => {
 
try{
   fetchReport({startMonth,startYear,endMonth,endYear});
}catch(error){
  console.log(error);
}



  
};

let count=0;
useEffect(() => {
    fetchReport({startMonth,startYear,endMonth,endYear});
}, []);

 if(loading){
  return <div>loading...</div>
 }

 if(error){
  return <div>Some error occure.</div>
 }
  if (!report) return <p>No report available.</p>;

    
  return (
    <main className="min-h-[calc(100vh-4rem)] w-full bg-[#0B0F0E] px-6 py-6 text-[#F5F5F5]">
      <div className='flex w-full flex-col gap-5 px-4 md:min-h-28  md:flex-row md:items-stretch md:justify-between'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-semibold'>Reports</h1>
          <p className='text-sm text-gray-400'>Track your income, expenses and savings</p>
        </div>

        <section className='flex min-h-32 w-full flex-col gap-3 rounded-lg border border-[#25332E] bg-[#111816] px-4 py-3 md:w-[35rem] md:max-w-full'>
          <p className='text-sm text-gray-400'>Select Period</p>

          <div className='flex flex-wrap items-center gap-2'>
            <div className='flex items-center gap-2'>
              <select
              value={startMonth}
               onChange={(e) => {setStartMonth(e.target.value)}}
                aria-label='Start month'
                className='rounded-lg border border-[#25332E] bg-[#111816] px-3 py-2 text-sm'
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
              <select
                 value ={startYear}
                onChange={(e)=>{setStartYear(e.target.value)}}
                aria-label='Start year'
                className='rounded-lg border border-[#25332E] bg-[#111816] px-3 py-2 text-sm'
              >
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
              </select>
            </div>

            <span aria-hidden='true' className='px-1 text-gray-400'>to</span>

            <div className='flex items-center gap-2'>
              <select
                 value ={endMonth}
                onChange={(e)=>{setEndMonth(e.target.value)}}
                aria-label='End month'
                className='rounded-lg border border-[#25332E] bg-[#111816] px-3 py-2 text-sm'
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
              <select
               value ={endYear}
                onChange={(e)=>{setEndYear(e.target.value)}}
                aria-label='End year'
                className='rounded-lg border border-[#25332E] bg-[#111816] px-3 py-2 text-sm'
              >
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
              </select>
            </div>

            <button
            onClick={handleSelect}
              type='button'
              className='ml-auto rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400'
            >
              Select
            </button>
          </div>
        </section>
      </div>

  <div className='flex  items-center gap-8 h-28 w-full mt-7 '>
      <div className='flex h-full w-[20%] flex-col gap-3 rounded-lg border border-[#25332E] bg-[#111816] px-4 py-3 '>
          <div className='flex items-center justify-around gap-1 '>

          <CircleArrowUp size={52} color="green" strokeWidth={1} />


          <div>
              <p className='text-sm text-gray-400'>Total income</p>
              <h1 className='text-2xl font-bold'>₹{report.incomeTotal}</h1>
               <p className='text-sm text-gray-400'>For Selected Period</p>
           </div>
      </div>

        </div>

         <div className='flex h-full w-[20%] flex-col gap-3 rounded-lg border border-[#25332E] bg-[#111816] px-4 py-3 '>
           <div className='flex items-center justify-around gap-1 '>

<CircleArrowDown size={52} color="#d54444" strokeWidth={1} />          
  <div>
              <p className='text-sm text-gray-400'>Total Expenses</p>
              <h1 className='text-2xl font-bold'>₹{report.expenseTotal}</h1>
              <p className='text-sm text-gray-400'>For Selected Period</p>
           </div>
      </div>

        </div>

         <div className='flex h-full w-[20%] flex-col gap-3 rounded-lg border border-[#25332E] bg-[#111816] px-4 py-3 '>
          <div className='flex justify-center items-center gap-3'>
            <PiggyBank size={52} color="green" strokeWidth={1} />
           <div>
             <p className='text-sm text-gray-400'>Total Saving</p>
            <h1 className='text-2xl font-bold'>₹{report.savingTotal}</h1>
            <p className='text-sm text-gray-400'>For Selected Period</p>

           </div>
      </div>

        </div>

         <div className='flex h-full w-[20%] flex-col gap-3 rounded-lg border border-[#25332E] bg-[#111816] px-4 py-3 '>
          <div className='flex justify-center items-center gap-3 '>

            <ScanLine size={52} color="#1bbce4" strokeWidth={1} />

             <div>
               <p className='text-sm text-gray-400'>Total Transactions</p>
            <h1 className='text-2xl font-bold'>{report.totalTransactions}</h1>
            <p className='text-sm text-gray-400'>For Selected Period</p>
             </div>

      </div>

        </div>

      </div>

 <MonthlyChart MonthsReport={report.MonthsReport} />

    
<div className="grid grid-cols-1 gap-6">
  <DonutChart
    title="Expenses by Category"
    MonthsReport={report?.MonthsReport ?? []}
    dataKey="expenseByCategory"
  />

  <DonutChart
    title="Expenses by Necessity"
    MonthsReport={report?.MonthsReport ?? []}
    dataKey="expenseByNecessity"
  />
</div>


   
         <div className='flex min-h-40 w-full mt-7 flex-col gap-3 rounded-lg border border-[#25332E] bg-[#111816] px-4 py-3 '>
        
           <h1 className='text-xl font-semibold '>Monthly Breakdown</h1>

           <div className='flex flex-wrap gap-2 items-center '>
            {
              report.MonthsReport.map((e)=>(
                       <MonthlySummary
      key={e.month}
      report={e}
    />
                       

              )
          
              )
            }
              
                 
           </div>

          </div>



    </main>
  )
}

export default Reports