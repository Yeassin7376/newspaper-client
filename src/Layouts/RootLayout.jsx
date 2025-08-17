import React from 'react';
import Navbar from '../shared/NavBar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../shared/Footer/Footer';

const RootLayout = () => {
  return (
    <div>
      <header className='sticky top-0 z-50 bg-base-200 shadow-sm'>
        <Navbar></Navbar>
      </header>
      <main className='min-h-[calc(100vh-285px)] w-11/12 mx-auto'>
        <Outlet></Outlet>
      </main>
      <footer className='bg-base-300'>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
