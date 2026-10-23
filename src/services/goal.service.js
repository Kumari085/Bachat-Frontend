import axios from "axios";

const api = axios.create(
 {baseURL:"http://localhost:3000/api/goal"}
);

export const getGoal = async()=>{
     const response =  await api.get("/");
     return response.data;
}

export const createGoal = async({name,targetAmount,currentAmount,deadline })=>{
     const response = await api.post("/",{name,targetAmount,currentAmount,deadline });
     return response.data;
}

export const deleteGoal = async ({id})=>{
     await api.delete(`/${id}`);
}


 export const addAmountToGoal = async ({id,amount})=>{
       const response = await api.post(`/${id}/add-money`,{amount});
       return response.data;
 }

 export const updateGoal = async ({id,updatedGoal})=>{
    
     const response = await api.put(`/${id}`,updatedGoal);
     return response.data;
 }