import axios from "axios";

export const getDashboard = async (month,year)=>{
    const response = await axios.get(
        `http://localhost:3000/api/dashboard?month=${month}&year=${year}`
    )

    return response.data;
}