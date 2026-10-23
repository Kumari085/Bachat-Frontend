import { useState } from "react";
import { getDashboard } from "../services/dashboard.service";


export const useDashboard = ()=>{

      const [dashboardData,setDashboardData]=useState(null);
      const [loading,setLoading]=useState(false);
      const [error,setError]=useState(null);

      const fetchDashboard = async (month,year)=>{
         
           setLoading(true);
             setError(null);
          try{
          const data =  await getDashboard(month,year);
          setDashboardData(data);
          }catch(error){
              setError(error);
          }finally{
            setLoading(false);
          }
      }

    return {dashboardData,fetchDashboard,loading,error}

}