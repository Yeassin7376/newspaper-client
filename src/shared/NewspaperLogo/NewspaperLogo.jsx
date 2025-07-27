import React from 'react';
import { useNavigate } from 'react-router';

const NewspaperLogo = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/')} className="flex items-end cursor-pointer">
      {/* <img className="mb-2" src={logo} alt="" /> */}
      <p className="text-3xl -ml-3">Newspaper</p>
    </div>
  );
};

export default NewspaperLogo;
