import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function MainLayout() {
  return (
    <div className='flex h-screen items-stretch overflow-hidden'>
      <Sidebar/>
      <div className='flex h-screen min-h-0 min-w-0 flex-1 flex-col overflow-y-auto'>
          <Navbar/>
          <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;