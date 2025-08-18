import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useUserRole from '../../hooks/useUserRole';
import NewspaperLogo from '../NewspaperLogo/NewspaperLogo';
import Loading from '../Loading/Loading';
import useUserProfile from '../../hooks/useUserProfile';
import useTheme from '../../hooks/useTheme';

const Navbar = () => {
  const { user, logout, loading } = useAuth();

  const { role } = useUserRole();
  const { userFromDB } = useUserProfile();
  const { theme, toggleTheme } = useTheme();

  const isPremium = userFromDB?.premiumExpiresAt && new Date(userFromDB?.premiumExpiresAt) > new Date();

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allArticlePublic">All Article</NavLink>
      </li>

      {isPremium && (
        <li>
          <NavLink to="/premiumArticles">Premium Articles</NavLink>
        </li>
      )}

      {user?.email && (
        <>
          <li>
            <NavLink to="/subscription">Subscription</NavLink>
          </li>
          <li>
            <NavLink to="/addArticle">Add Article</NavLink>
          </li>
          <li>
            <NavLink to="/myArticles">My Articles</NavLink>
          </li>
        </>
      )}
      {role === 'admin' && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li>
        <NavLink to="/aboutUs">About us</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-1 w-11/12 mx-auto flex items-center ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost pl-0 pr-2 lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {' '}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{' '}
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <a className=" text-xl">
          <NewspaperLogo></NewspaperLogo>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <input type="checkbox" value="dark" className="toggle theme-controller" checked={theme === 'dark'} onChange={(e) => {
          toggleTheme(e.target.checked);
        }} />
        {user?.photoURL && (
          <Link to="/myProfile">
            <img className="w-10 md:w-16 h-10 md:h-16 mr-2 p-0.5 bg-blue-200 object-cover rounded-full" src={user?.photoURL} title={user?.displayName} alt="" />
          </Link>
        )}
        {user?.email ? (
          <button onClick={handleLogout} className="btn btn-primary text-white">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary hover:text-white  mr-2">
              Login
            </Link>
            <Link to="/register" className="btn-sm md:btn btn-primary btn-outline hover:text-white">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
