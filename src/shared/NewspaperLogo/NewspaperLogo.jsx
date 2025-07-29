import React from 'react';
import { useNavigate } from 'react-router';
import logo from '/newspaperlogo.jpg'

const NewspaperLogo = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/')} className="flex justify-start items-center  cursor-pointer">
      <img className="w-10 h-10 md:w-14 md:h-14 " src={logo} alt="" />
      <p className="text-3xl ml-3 hidden md:block">Newspaper</p>
    </div>
  );
};

export default NewspaperLogo;
