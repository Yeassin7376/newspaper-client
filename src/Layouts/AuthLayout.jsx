import React from 'react';
import { Outlet } from 'react-router';
import NewspaperLogo from '../shared/NewspaperLogo/NewspaperLogo';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="navbar bg-base-100 shadow-sm">
        <a className=" text-xl"><NewspaperLogo></NewspaperLogo></a>
      </div>
      <div className='flex items-center justify-center bg-base-200 px-4 py-4'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
