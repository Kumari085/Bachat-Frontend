
import { useEffect, useState } from 'react'
import { Trash,Target, CircleX,Trophy, Clock7, CircleCheckBig ,CalendarDays, Pencil} from 'lucide-react'
import { useGoal } from '../hooks/useGoal'

function Goal() {
  
   const {goals,error,loading,fetchGoals,addGoal,removeGaol,addAmountGaol,addUpdatedGaol} =useGoal();
   const [amount,setAmount]=useState({});
   const [targetAmount,setTargetAmont]=useState('');
   const [currentAmount,setCurrentAmount]=useState('');
   const [goalname,setGoalName]=useState('');
   const [startDate,setStartDate]=useState('');
   const [endDate,setEndDate]=useState('')
   const [goalToUpdate,setGoalToUpdate]=useState(null);
   const [updateForm,setUpdateForm]=useState({name:'',targetAmount:'',currentAmount:'',deadline:''});
   const [updateMessage,setUpdateMessage]=useState('');

  let total=0;
  let totalAchieved=0;
  let totalPending=0;
  let totalExpired=0;
  
  const handleAddAmount =  async ()=>{
           

     await addGoal({name:goalname,targetAmount,currentAmount,deadline:endDate});
 
        await fetchGoals();
        setUpdateMessage("Goal has beed Added successfuly")

           setTargetAmont("");
           setCurrentAmount("");
           setGoalName("");
           setStartDate("");
           setEndDate("");
  }

   const handleDelete = async (id)=>{
     await removeGaol({id});
         await fetchGoals();
         setUpdateMessage("Goal Deleted");
          
   }

   useEffect(() => {
  if (!updateMessage) return;

  const timer = setTimeout(() => {
    setUpdateMessage('');
  }, 3000);



  return () => clearTimeout(timer);
}, [updateMessage]);

   useEffect(()=>{
        fetchGoals();
        
   },[]);

   useEffect(() => {
      if (!goalToUpdate) return undefined;

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (event) => {
         if (event.key === 'Escape') {
            setGoalToUpdate(null);
         }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
         document.body.style.overflow = previousOverflow;
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [goalToUpdate]);

   const handleOpenUpdate = (goal) => {
      const deadline = String(goal.deadline ?? '');
      const formattedDeadline = /^\d{4}-\d{2}-\d{2}/.test(deadline)
         ? deadline.slice(0, 10)
         : (() => {
            const parsedDeadline = new Date(deadline);
            return Number.isNaN(parsedDeadline.getTime())
               ? ''
               : `${parsedDeadline.getFullYear()}-${String(parsedDeadline.getMonth() + 1).padStart(2, '0')}-${String(parsedDeadline.getDate()).padStart(2, '0')}`;
         })();

      setUpdateForm({
         name: goal.name ?? '',
         targetAmount: goal.targetAmount ?? '',
         currentAmount: goal.currentAmount ?? '',
         deadline: formattedDeadline,
      });
      setUpdateMessage('');
      setGoalToUpdate(goal);
   };

   const handleUpdateSubmit = async (event) => {
      event.preventDefault();
      await addUpdatedGaol({id:goalToUpdate._id,updatedGoal:updateForm});

      // console.log(goalToUpdate._id);
      // console.log(updateForm);
       setUpdateMessage('Goal has been updated.');
       setGoalToUpdate(null);

      await fetchGoals();
   };

   const handleAddAmountToGoal =async (id)=>{
      const Amount = Number(amount[id]);
      console.log(Amount);
      await addAmountGaol({id,amount:Amount});
      await fetchGoals();

        setUpdateMessage("Amount has been added successfully")
        setAmount((prev) => ({
    ...prev,
    [id]: ""
  }));
   }

   goals.map((e)=>{
      if(e.status==='achieved'){
        totalAchieved+=1;
      }

      if(e.status==='pending'){
        totalPending+=1;
      }

      if(e.status==='expired'){
        totalExpired+=1;
      }

      total+=1;
   })

   


   if(loading){
    return <div>Loading..</div>
   }

   if(error){
    return <div>somthing went wong.</div>
   }

   



  return (
    <main className="min-h-[calc(100vh-4rem)] relative w-full bg-[#0B0F0E] px-6 py-6 text-[#F5F5F5]">
{updateMessage&&<div className="fixed h-10 w-full inset-0 z-10 flex items-center justify-center mt-18">
  <div className=" h-full w-100 rounded-lg border-[#25332E] bg-green-600 flex items-center justify-center">
    <h1 className='font-semibold text-white '>{updateMessage}</h1>
  </div>
</div>}
      {/* Header */}
      <div className="flex items-center gap-3">
        <Target size={56} color="#145c00" strokeWidth={1} />
        <div>
          <h1 className="text-2xl font-semibold">Goals</h1>
          <p className="text-sm text-gray-400">
            Set your goals, track your progress, achieve your dreams
          </p>
        </div>
      </div>

      {/* Summary Cards + Add New Goal */}
      <div className="flex flex-wrap items-stretch gap-4 w-full mt-4">

        {/* Total Goals */}
        <div className="rounded-xl flex flex-col justify-center gap-3 h-44 w-40 shrink-0 border border-[#25332E] bg-[#111816] p-4">
          <Target size={32} color="#145c00" strokeWidth={1} />
          <p className="text-sm text-gray-400">Total Goals</p>
          <h1 className="text-xl">{total}</h1>
          <p className="text-sm text-gray-400">Active Goals</p>
        </div>

        {/* Completed */}
        <div className="rounded-xl flex flex-col justify-center gap-3 h-44 w-40 shrink-0 border border-[#25332E] bg-[#111816] p-4">
          <CircleCheckBig size={32} color="#145c00" strokeWidth={1} />
          <p className="text-sm text-gray-400">Completed</p>
          <h1 className="text-xl">{totalAchieved}</h1>
          <p className="text-sm text-gray-400">Goal achieved</p>
        </div>

        {/* Pending */}
        <div className="rounded-xl flex flex-col justify-center gap-3 h-44 w-40 shrink-0 border border-[#25332E] bg-[#111816] p-4">
          <Clock7 size={32} color="#777408" strokeWidth={1} />
          <p className="text-sm text-gray-400">Pending</p>
          <h1 className="text-xl">{totalPending}</h1>
          <p className="text-sm text-gray-400">In progress</p>
        </div>

        {/* Expired */}
        <div className="rounded-xl flex flex-col justify-center gap-3 h-44 w-40 shrink-0 border border-[#25332E] bg-[#111816] p-4">
          <CircleX size={32} color="#8c1c08" strokeWidth={1} />
          <p className="text-sm text-gray-400">Expired</p>
          <h1 className="text-xl">{totalExpired}</h1>
          <p className="text-sm text-gray-400">Not completed</p>
        </div>

        {/* Add New Goal */}
        <div className="w-full max-w-[32rem] min-w-[18rem] rounded-xl border border-[#2a3b36] bg-[#101b18] p-4 shadow-[0_0_0_1px_rgba(39,53,49,0.4)]">
          <h1 className="mb-4 text-2xl font-semibold text-white">Add New Goal</h1>

          <div className="space-y-3">
            <input
              type="text"
               value={goalname}
                onChange={(e)=>{setGoalName(e.target.value)}}
              placeholder="Goal name"
              className="h-10 w-full rounded-lg border border-[#2a3b36] bg-[#0B0F0E] px-3 text-sm text-[#f5f5f5] placeholder:text-gray-500 outline-none transition focus:border-[#31c46a] focus:ring-2 focus:ring-[#1b4d37]"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={targetAmount}
                onChange={(e)=>{setTargetAmont(e.target.value)}}
                placeholder="Target amount"
                className="h-10 w-full rounded-lg border border-[#2a3b36] bg-[#0B0F0E] px-3 text-sm text-[#f5f5f5] placeholder:text-gray-500 outline-none transition focus:border-[#31c46a] focus:ring-2 focus:ring-[#1b4d37]"
              />

              <input
                type="number"
                value={currentAmount}
                onChange={(e)=>{setCurrentAmount(e.target.value)}}
                placeholder="Current amount"
                className="h-10 w-full rounded-lg border border-[#2a3b36] bg-[#0B0F0E] px-3 text-sm text-[#f5f5f5] placeholder:text-gray-500 outline-none transition focus:border-[#31c46a] focus:ring-2 focus:ring-[#1b4d37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                onChange={(e)=>{setStartDate(e.target.value)}}
                  aria-label="Goal start date"
                  className="h-10 w-full rounded-lg border border-[#2a3b36] bg-[#0B0F0E] px-3 pr-9 text-sm text-gray-400 outline-none transition focus:border-[#31c46a] focus:ring-2 focus:ring-[#1b4d37]"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M8 3v4M16 3v4M3 10h18" />
                  </svg>
                </span>
              </div>

              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                onChange={(e)=>{setEndDate(e.target.value)}}
                  aria-label="Goal deadline"
                  className="h-10 w-full rounded-lg border border-[#2a3b36] bg-[#0B0F0E] px-3 pr-9 text-sm text-gray-400 outline-none transition focus:border-[#31c46a] focus:ring-2 focus:ring-[#1b4d37]"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M8 3v4M16 3v4M3 10h18" />
                  </svg>
                </span>
              </div>
            </div>

            <button onClick={handleAddAmount} className="w-full rounded-lg bg-[#2ecb67] px-3 py-2.5 text-base font-semibold text-white shadow-[0_4px_18px_rgba(46,203,103,0.35)] transition hover:bg-[#2bbd5f] active:scale-[0.99]">
              Add Goal
            </button>
          </div>
        </div>
      </div>

      {/* Your Goals */}
      <div className="min-h-80 w-full mt-8 p-3 flex flex-col">

        <div>
          <h1 className="text-xl font-semibold">Your Goals</h1>
          <p className="text-sm text-gray-400">
            Track your progress and stay motivated
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-4">

          {/* Goal Card */}
          {goals.map((e)=>{
            return <div key={e._id} className="rounded-xl flex flex-col justify-between  gap-3 min-h-85 w-75 border border-[#25332E] bg-[#111816] p-3">
            <div className='flex items-center justify-between p-1'>
              <h1>{e.name}</h1>
            
            {e.status=='pending'&& <p className='px-3 py-1 text-gray-400 text-sm border items-center justify-center border-yellow-400 rounded-4xl bg-yellow-500/12  '>{e.status}</p>}
            
            {e.status=='expired'&& <p className='px-3 py-1 text-gray-400 text-sm border items-center justify-center border-red-700 rounded-4xl bg-red-500/12  '>{e.status}</p>}

            {e.status=='achieved'&& <p className='px-3 py-1 text-gray-400 text-sm border items-center justify-center border-green-700 rounded-4xl bg-green-500/12  '>{e.status}</p>}

            
            </div>

            <div className='mt-3 flex flex-col justify-center'>
               <h1>₹{e.currentAmount}/₹{e.targetAmount}</h1>
               <div className="h-2.5 w-full overflow-hidden rounded-full mt-3 bg-[#25332E]">
        <div
        
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
          style={{
            width: `${Math.min(100, Math.max(0,100-e.percentage ))}%`,
          }}
        />

      </div>
            </div>

            <div className='flex item-center justify-between p-2'>
           <div className=' flex flex-col '> 
            <div className='flex  justify-center items-center gap-1'>
            <CalendarDays size={22} color="gray" strokeWidth={1} /><h1 className='text-sm text-gray-400'>Start Date</h1>
            </div>
             <h1 className="text-sm">
               {new Date(e.startDate).toLocaleDateString("en-US", {
                month: "short",
                 day: "numeric",
                 year: "numeric"
           })}
          </h1>
            </div>

             <div className=' flex flex-col '> 
            <div className='flex  justify-center items-center gap-1'>
            <CalendarDays size={22} color="gray" strokeWidth={1} /><h1 className='text-sm text-gray-400'>End Date</h1>
            </div>
             <h1 className="text-sm">
               {new Date(e.deadline).toLocaleDateString("en-US", {
                month: "short",
                 day: "numeric",
                 year: "numeric"
           })}
          </h1>
            </div>
        </div>

              {e.status==='pending'&& <div className='mt-3 flex flex-col justify-center'>
        <p className='text-sm text-gray-400'>Add mony to your goal</p>
           <input
                  type="number"
                  value={amount[e._id]??""}
             onChange={(event) =>
                setAmount({
                 ...amount,
                   [e._id]: Number(event.target.value)
                  
                  })
                 }      aria-label="Goal deadline"
                  placeholder='₹ Enter Amount (₹)'
                  className="h-8 mt-2 w-full rounded-lg border border-[#2a3b36] bg-[#0B0F0E] px-3 pr-9 text-sm text-gray-400 outline-none transition focus:border-[#31c46a] focus:ring-2 focus:ring-[#1b4d37]"
                />

                <button onClick={()=>handleAddAmountToGoal(e._id)} className='px-1 py-1 bg-green-500 mt-2 rounded-lg'>Add Money</button>
        </div>}

         {e.status==='expired'&&<div className='flex items-center justify-center gap-2'><CircleX size={22} color="red" strokeWidth={1} /><h1 className='text-red-600 text-sm'>Deadline passed. best luck next time!</h1></div>}
        {e.status==='achieved'&&<div className='flex items-center justify-center gap-2'><Trophy size={22} color="green" strokeWidth={1} /><h1 className='text-green-600 text-sm'>Congratulations! you achieve this goal</h1></div>}
 
   <div className='flex items-center justify-between'>
     <button onClick={()=> handleDelete(e._id)} className='flex flex-row items-center active:scale-95  gap-1'> <Trash color="red" strokeWidth={0.75} /><h1 className='text-red-500 font-semibold'>delete Goal</h1></button>
      <button onClick={()=>handleOpenUpdate(e)} className='flex flex-row items-center active:scale-95 gap-1 text-emerald-400 hover:text-emerald-300'>
        <Pencil size={18} strokeWidth={1.5} />
        <span className='font-semibold'>Update</span>
      </button>
    
    </div>   

          </div>
          })}


          

        </div>

        
      </div>

      {goalToUpdate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/65 p-4"
          style={{ backdropFilter: 'blur(5px)' }}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="update-goal-title"
            className="w-full max-w-lg rounded-xl border border-[#2a3b36] bg-[#101b18] p-6 shadow-2xl"
          >

             <button onClick={()=>{ setGoalToUpdate(null)}} className='text-2xl text-gray-500 ml-110 mt-1'>X</button>
            <h2 id="update-goal-title" className="mb-5 text-2xl font-semibold text-white">Update Goal</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <label className="block space-y-1.5 text-sm text-gray-300">
                <span>Goal Name</span>
                <input
                  type="text"
                  required
                  value={updateForm.name}
                  onChange={(event) => setUpdateForm((previous) => ({ ...previous, name: event.target.value }))}
                  className="h-10 w-full rounded-lg border border-[#2a3b36] bg-[#0B0F0E] px-3 text-sm text-[#f5f5f5] outline-none transition focus:border-[#31c46a] focus:ring-2 focus:ring-[#1b4d37]"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block space-y-1.5 text-sm text-gray-300">
                  <span>Target Amount</span>
                  <input
                    type="number"
                    min="0"
                    required
                    value={updateForm.targetAmount}
                    onChange={(event) => setUpdateForm((previous) => ({ ...previous, targetAmount: event.target.value }))}
                    className="h-10 w-full rounded-lg border border-[#2a3b36] bg-[#0B0F0E] px-3 text-sm text-[#f5f5f5] outline-none transition focus:border-[#31c46a] focus:ring-2 focus:ring-[#1b4d37]"
                  />
                </label>
                <label className="block space-y-1.5 text-sm text-gray-300">
                  <span>Current Amount</span>
                  <input
                    type="number"
                    min="0"
                    required
                    value={updateForm.currentAmount}
                    onChange={(event) => setUpdateForm((previous) => ({ ...previous, currentAmount: event.target.value }))}
                    className="h-10 w-full rounded-lg border border-[#2a3b36] bg-[#0B0F0E] px-3 text-sm text-[#f5f5f5] outline-none transition focus:border-[#31c46a] focus:ring-2 focus:ring-[#1b4d37]"
                  />
                </label>
              </div>

              <label className="block space-y-1.5 text-sm text-gray-300">
                <span>Deadline</span>
                <input
                  type="date"
                  required
                  value={updateForm.deadline}
                  onChange={(event) => setUpdateForm((previous) => ({ ...previous, deadline: event.target.value }))}
                  className="h-10 w-full rounded-lg border border-[#2a3b36] bg-[#0B0F0E] px-3 text-sm text-gray-300 outline-none transition focus:border-[#31c46a] focus:ring-2 focus:ring-[#1b4d37]"
                />
              </label>

              {updateMessage && (
                <p role="status" className="text-sm text-emerald-400">{updateMessage}</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setGoalToUpdate(null)}
                  className="rounded-lg border border-[#2a3b36] px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-[#1b2924]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                 
                  className="rounded-lg bg-[#2ecb67] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2bbd5f]"
                >
                  Update Goal
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

    </main>
  )
}

export default Goal
