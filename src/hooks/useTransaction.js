import { useState } from "react";
import { getTransactions, createTransaction,deleteTransaction ,updateTransaction} from '../services/transaction.service'

export const useTransaction = ()=>{

const [Transactions, setTransaction] = useState([]);
     const [loading,setLoading]=useState(false);
     const [ error,setError]=useState(null);

     const fetchTransaction = async ({ month, year, type, category })=>{
         setLoading(true);
         setError(null);
        try{
           
            const data = await getTransactions({ month, year, type, category })
            setTransaction(data);

        }catch(error){

            setError(error)
        }finally{
            setLoading(false);
        }
     }

     const addTransaction = async (transactionData)=>{
      
         setLoading(true);
         setError(null);
         try {
            return await createTransaction(transactionData);
         } finally {
            setLoading(false);
         }
     }

      const removeTransaction = async ({id})=>{
      
         setLoading(true);
         setError(null);
         try {
            return await deleteTransaction({id});
         } finally {
            setLoading(false);
         }
     }

     const updateTheTransaction = async ({id,updatedTransactionForm})=>{
      
         setLoading(true);
         setError(null);
         try {
            console.log(id);
            console.log(updatedTransactionForm)
            return await updateTransaction({id,updatedTransactionForm});
         } finally {
            setLoading(false);
         }
     }



     return{Transactions,loading,error,fetchTransaction,addTransaction,removeTransaction,updateTheTransaction};


}
