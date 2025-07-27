import React from 'react';
import Navbar from '../shared/NavBar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../shared/Footer/Footer';

const RootLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className='min-h-[calc(100vh-285px)]'>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
