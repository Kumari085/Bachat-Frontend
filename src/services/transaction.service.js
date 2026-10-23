import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/transaction"
});

export const getTransactions = async ({ month, year, type, category }) => {

  

  const response = await api.get("/", {
    params: {
      month,
      year,
      type,
      category
    }
  });

  return response.data;
};

export const createTransaction = async ({amount,type,category,date,description,necessity})=>{
  
    const response = await api.post("/", {amount,type,category,date,description,necessity});

  return response.data;
};


export const updateTransaction = async ({id,updatedTransactionForm}) => {
  const response = await api.put(`/${id}`, updatedTransactionForm);

  return response.data;
};

export const  deleteTransaction = async ({id}) => {
  const response = await api.delete(`/${id}`);

  return response.data;
};