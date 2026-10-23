import { useEffect, useState } from 'react'
import { useTransaction } from '../hooks/useTransaction';
import {Trash,SquarePen} from 'lucide-react';
import { updateTransaction } from '../services/transaction.service';


function Transactions() {

const { Transactions, loading, error, fetchTransaction , addTransaction,removeTransaction,updateTheTransaction} = useTransaction();

// Search filters
const [searchDate, setSearchDate] = useState('');
const [searchType, setSearchType] = useState('');
const [searchCategory, setSearchCategory] = useState('');
const [showForm, setShowForm] = useState(false);

// New transaction fields
const [amount,setAmount]=useState('');
const [transactionType, setTransactionType] = useState('expense');
const [transactionCategory, setTransactionCategory] = useState('');
const [transactionDate, setTransactionDate] = useState('');
const [description,setDescription]=useState('');
const [necessity, setNecessity] = useState('necessary');
const [submitError, setSubmitError] = useState('');


//message variable
const [message,setMessage]=useState("");

//updates
const [updatedTransactionForm,setUpdatedTransactionForm]=useState({amount: "",type: "", category: "", date: "", description: ""})
const [TransactionToUpdate,setTransactionToUpdate]=useState(null);
const [OpenUpdateForm,setOpenUpdateForm]=useState(false);


const handleOpenUpdateForm = (e)=>{
       console.log(e);
       setTransactionToUpdate(e);
         setUpdatedTransactionForm({amount:e.amount,type:e.type, category: e.category, date:e.date, description:e.description})

        setOpenUpdateForm(true);
}

const handlSubmit = async ()=>{
  const numericAmount = Number(amount);
  const trimmedCategory = transactionCategory.trim();

  if (!amount.trim() || !Number.isFinite(numericAmount) || numericAmount < 0) {
    setSubmitError('Enter a valid amount of zero or more.');
    return;
  }

  if (!trimmedCategory) {
    setSubmitError('Enter a category.');
    return;
  }

  const transactionData = {
    amount: numericAmount,
    type: transactionType,
    category: trimmedCategory,
    date: transactionDate || undefined,
    description: description.trim(),
    necessity
  };

  setSubmitError('');

  try {
    await addTransaction(transactionData);

    setShowForm(false);
    setAmount('');
    setTransactionType('expense');
    setTransactionCategory('');
    setTransactionDate('');
    setDescription('');
    setNecessity('necessary');

    await fetchTransaction({
      month: undefined,
      year: undefined,
      type: "",
      category: ""
    });
  } catch (error) {
    setSubmitError(
      error.response?.data?.error || error.message || 'Failed to save transaction.'
    );
  }
}


const handleSerch = () => {
  let month;
  let year;

  if(searchDate){
    const selectDate = new Date(searchDate);

   month = selectDate.getMonth() + 1;
   year = selectDate.getFullYear();
  }

 

  fetchTransaction({
    month,
    year,
    type: searchType,
    category: searchCategory
  });
};

const handleDelete = async (id)=>{
     await removeTransaction({id});
      setMessage("Transaction is Deleted Successfully")
     await fetchTransaction({
      month: undefined,
      year: undefined,
      type: "",
      category: ""
    });
 }

 const handleUpdateTransactionFrom = async ()=>{
  
    await updateTheTransaction( {id:TransactionToUpdate._id,updatedTransactionForm});
  
    setMessage("Your Transaction has been Updated Successfully");
    setOpenUpdateForm(false);

 await fetchTransaction({
      month: undefined,
      year: undefined,
      type: "",
      category: ""
    });
  

}

useEffect(() => {
    fetchTransaction({
        month: undefined,
        year: undefined,
        type: '',
        category: ''
    });
}, []);

useEffect(() => {
    if(!message) return;
     const timer=setTimeout(() => {
        setMessage("");
     }, 3000);

     return ()=> clearTimeout(timer);
}, [message]);


if (loading) {
  return <div>Loading transactions...</div>;
}

if (error) {
  return <div>Failed to load transactions.</div>;
}





//   const transactions = [
//   {
//     id: 1,
//     date: '07 Oct 2026',
//     category: 'Food',
//     type: 'Expense',
//     amount: 500
//   },
//   {
//     id: 2,
//     date: '06 Oct 2026',
//     category: 'Salary',
//     type: 'Income',
//     amount: 10000
//   },
//   {
//     id: 3,
//     date: '05 Oct 2026',
//     category: 'Study',
//     type: 'Expense',
//     amount: 900
//   }
// ]



  


  return (
     <main className="min-h-[calc(100vh-4rem)] relative w-full bg-[#0B0F0E] px-6 py-6 text-[#F5F5F5]">


  {message&&<div className=' h-10  w-full w-50 z-10 inset-0 fixed flex justify-center  mt-18 '>
    <div className='bg-green-500 w-100 text-center h-10 flex justify-center items-center rounded-2xl'><h1>{message}</h1></div>
</div>}
<section className='flex justify-between items-center'>

 <h1 className='text-3xl font-semibold'>Transaction</h1>

 <button
  onClick={() => {
    setSubmitError('');
    setShowForm(true);
  }}
  className="px-2 py-1 bg-green-950 rounded active:scale-95"
>
  Add Transaction
</button>

{showForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

    <div className="w-full max-w-lg rounded-2xl border border-[#25332E] bg-[#111816] p-6 shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Add Transaction</h2>
          <p className="text-sm text-[#9AA9A2] mt-1">
            Add a new income or expense
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="text-[#9AA9A2] hover:text-white text-xl"
        >
          ×
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4">

        <div>
          <label className="text-sm text-[#9AA9A2]">Amount</label>
          <input
             value={amount}
             onChange={(e)=>{setAmount(e.target.value)}}
            type="number"
            placeholder="Enter amount"
            className="w-full h-10 mt-1 rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 outline-none focus:border-green-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-[#9AA9A2]">Type</label>
            <select
               value={transactionType}
               onChange={(e)=>{setTransactionType(e.target.value)}}
              className="w-full h-10 mt-1 rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 outline-none"
            >
              <option value="expense">expense</option>
              <option value="income">income</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-[#9AA9A2]">Necessity</label>
            <select
            value={necessity}
            onChange={(e)=>{setNecessity(e.target.value)}}
              className="w-full h-10 mt-1 rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 outline-none"
            >
              <option value="necessary">necessary</option>
              <option value="optional">optional</option>
              <option value="avoidable">avoidable</option>
            </select>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-[#9AA9A2]">Category</label>
            <input
            value={transactionCategory}
            onChange={(e)=>{setTransactionCategory(e.target.value)}}
              type="text"
              placeholder="e.g. Food"
              className="w-full h-10 mt-1 rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-[#9AA9A2]">Date</label>
            <input
              value={transactionDate}
              onChange={(e)=>{setTransactionDate(e.target.value)}}
              type="date"
              className="w-full h-10 mt-1 rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 outline-none [color-scheme:dark]"
            />
          </div>

        </div>

        <div>
          <label className="text-sm text-[#9AA9A2]">Description</label>
          <textarea
           value={description}
           onChange={(e)=>{setDescription(e.target.value)}}
            placeholder="Optional description"
            rows="3"
            className="w-full mt-1 rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 py-2 outline-none resize-none focus:border-green-500"
          />
        </div>

      </div>

      {submitError && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {submitError}
        </p>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">

        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="px-4 py-2 rounded-lg border border-[#25332E] text-[#9AA9A2] hover:text-white"
        >
          Cancel
        </button>

        <button
        onClick={handlSubmit}
          type="button"
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 active:scale-95"
        >
          Save Transaction
        </button>

      </div>

    </div>

  </div>
)}



</section>
<h1 className='font-semibold mt-5'>Search Your Transaction</h1>

<div className='h-30 w-full rounded-xl border border-[#25332E] bg-[#111816] p-5 mt-2'>


<div className='flex p-3 justify-between items-center'>

<input
  value={searchDate}
  onChange={(e) => setSearchDate(e.target.value)}
  type="date"
  className="w-48 h-10 mt-2 rounded border border-[#25332E] bg-[#111816] px-2 py-1 text-white [color-scheme:light]"
/>


<div>
  <label  >Type</label> <br /> 
<select value={searchType}
  onChange={(e) => setSearchType(e.target.value)} className='bg-[#111816] mt-2'  >
  <option value ="">All</option>
  <option value="income">Income</option>
  <option value="expense">Expense</option>
</select>
</div>

<div>
<label  >Category</label> <br />
<input value={searchCategory}
onChange={(e) => setSearchCategory(e.target.value)} id='category' type='text' className='w-48 h-10 mt-2 rounded border border-[#25332E] bg-[#111816] px-2 py-1' placeholder='Catergory'></input>

</div>

<button onClick={handleSerch} className='px-2 py-1 rounded bg-green-500  active:scale-95'>Search</button>


</div>

</div>

<div className="mt-5 w-full min-h-[500px] p-4 rounded-xl overflow-y-auto border border-[#25332E] bg-[#111816]">
 <h1 className="text-xl font-semibold mb-4">All Transactions</h1>

<table className="w-full text-left">
  <thead>
    <tr className="border-b border-[#25332E] bg-green-400 text-black">
      <th className="py-3">Date</th>
      <th className="py-3">Category</th>
      <th className="py-3">Type</th>
      <th className="py-3">Amount</th>
      <th className="py-3">Description</th>
      <th className="py-3">Delete Transaction</th>
       <th className="py-3">Update Transaction</th>
    </tr>
  </thead>

  <tbody>
    {Transactions.map((transaction) => (
      <tr
        key={transaction.id}
        className="border-b border-[#25332E]"
      >
       <td className="py-3">
  {new Date(transaction.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })}
</td>
        <td className="py-3">{transaction.category}</td>
        <td className="py-3">{transaction.type}</td>
        <td className="py-3 text-green-500 font-bold">₹{transaction.amount}</td>
        <td className="py-3">{transaction.description}</td>
         <td className="py-3"> <button onClick={()=>handleDelete(transaction._id)} className="active:scale-95"><Trash color="red" strokeWidth={0.75} /></button></td> 
      <td className="py-3">  <button onClick={()=>handleOpenUpdateForm(transaction)} className="active:scale-95"><SquarePen color="white" strokeWidth={0.75} /></button></td> 
      </tr>
    ))}
  </tbody>
</table>
</div>

{OpenUpdateForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

    <div className="w-full max-w-lg rounded-2xl border border-[#25332E] bg-[#111816] p-6 shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Update Transaction</h2>
          <p className="text-sm text-[#9AA9A2] mt-1">
            Update your Transaction
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpenUpdateForm(false)}
          className="text-[#9AA9A2] hover:text-white text-xl"
        >
          ×
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4">

        <div>
          <label className="text-sm text-[#9AA9A2]">Amount</label>
          <input
             value={updatedTransactionForm.amount}
             onChange={(e) =>
                    setUpdatedTransactionForm({
                    ...updatedTransactionForm,
                  amount: e.target.value
              })}
            type="number"
            placeholder="Enter amount"
            className="w-full h-10 mt-1 rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 outline-none focus:border-green-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-[#9AA9A2]">Type</label>
            <select
               value={updatedTransactionForm.type}
               onChange={(e) =>
                    setUpdatedTransactionForm({
                    ...updatedTransactionForm,
                  type: e.target.value
              })}
              className="w-full h-10 mt-1 rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 outline-none"
            >
              <option value="expense">expense</option>
              <option value="income">income</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-[#9AA9A2]">Necessity</label>
            <select
            value={updatedTransactionForm.necessity}
            onChange={(e) =>
                    setUpdatedTransactionForm({
                    ...updatedTransactionForm,
                  necessity: e.target.value
              })}
              className="w-full h-10 mt-1 rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 outline-none"
            >
              <option value="necessary">necessary</option>
              <option value="optional">optional</option>
              <option value="avoidable">avoidable</option>
            </select>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-[#9AA9A2]">Category</label>
            <input
            value={updatedTransactionForm.category}
            onChange={(e) =>
                    setUpdatedTransactionForm({
                    ...updatedTransactionForm,
                  category: e.target.value
              })}
              type="text"
              placeholder="e.g. Food"
              className="w-full h-10 mt-1 rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-[#9AA9A2]">Date</label>
            <input
             value={updatedTransactionForm.date?.slice(0, 10)}
               onChange={(e) =>
                    setUpdatedTransactionForm({
                    ...updatedTransactionForm,
                  date: e.target.value
              })
            }
              type="date"
              className="w-full h-10 mt-1 rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 outline-none [color-scheme:dark]"
            />
          </div>

        </div>

        <div>
          <label className="text-sm text-[#9AA9A2]">Description</label>
          <textarea
           value={updatedTransactionForm.description}
           onChange={(e) =>
                    setUpdatedTransactionForm({
                    ...updatedTransactionForm,
                  description: e.target.value
              })}
            placeholder="Optional description"
            rows="3"
            className="w-full mt-1 rounded-lg border border-[#25332E] bg-[#0B0F0E] px-3 py-2 outline-none resize-none focus:border-green-500"
          />
        </div>

      </div>

      {submitError && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {submitError}
        </p>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">

        <button
          type="button"
          onClick={() => setOpenUpdateForm(false)}
          className="px-4 py-2 rounded-lg border border-[#25332E] text-[#9AA9A2] hover:text-white"
        >
          Cancel
        </button>

        <button
        onClick={handleUpdateTransactionFrom}
          type="button"
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 active:scale-95"
        >
          Update Transaction
        </button>

      </div>

    </div>

  </div>
)}


     </main>
  )
}

export default Transactions
