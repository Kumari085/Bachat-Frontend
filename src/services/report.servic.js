
import axios from "axios";

export const getReport = async ({startMonth,startYear,endMonth,endYear}) =>{
  const response = await axios.get('http://localhost:3000/api/reports',{params:{startMonth,startYear,endMonth,endYear}
});
  return response.data;

}