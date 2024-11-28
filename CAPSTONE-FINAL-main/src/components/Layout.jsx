import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return <div>
    <div className="flex">
        <Sidebar />
        <div className="w-full ml-16 md:ml-56">
            <Outlet />
        </div>
    </div>
    </div>
  
};

export default Layout