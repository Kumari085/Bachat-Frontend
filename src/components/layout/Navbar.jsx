import React from 'react'
import { useLocation } from 'react-router-dom';
import {User} from 'lucide-react'

function Navbar() {

    const location = useLocation();
    let title;

    if (location.pathname === "/") {
    title = "Dashboard";
  } else if (location.pathname === "/report") {
    title = "Reports";
  } else if (location.pathname=== '/transaction'){
    title ="Transactions"
  } else if (location.pathname==='/goal'){
    title = "Goals"
  } else if ( location.pathname === '/setting'){
    title = "Setting"
  }

  return (
    <div className="h-16 w-full p-4 flex justify-between text-[#F5F5F5]  px-6 bg-[#111816] border-b border-[#25332E]">

  <h1>{title}</h1>

  <h1 className=' flex items-center gap-1'><User size={16} strokeWidth={1} />User</h1>

    </div>
  )
}

export default Navbar