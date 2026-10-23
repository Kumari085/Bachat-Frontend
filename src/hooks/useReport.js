import { useState } from "react";
import { getReport } from "../services/report.servic";


export const useReport = () => {

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReport = async ({startMonth,startYear,endMonth,endYear}) => {
        setLoading(true);
        setError(null);
        try {
            
           const data = await getReport({startMonth,startYear,endMonth,endYear});
              setReport(data);

              
        } 

        catch (error)
         {
              console.log(error);
        } 

        finally {
              setLoading(false)
        }

    }
    


    return {report,error,loading,fetchReport};

}