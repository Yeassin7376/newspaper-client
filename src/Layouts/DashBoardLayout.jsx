import React from 'react';
import { NavLink, Outlet } from 'react-router'; // Use 'react-router-dom' instead of 'react-router'
import { FaUsers, FaNewspaper, FaPlusCircle, FaTachometerAlt } from 'react-icons/fa';
import NewspaperLogo from '../shared/NewspaperLogo/NewspaperLogo';

const DashboardLayout = () => {
  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-colors duration-300 ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-100'}`;

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar (Mobile) */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-xl font-semibold">Dashboard</div>
        </div>

        {/* Nested Routes Render Here */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          <NewspaperLogo></NewspaperLogo>

          <li>
            <NavLink to="/dashboard" end className={navLinkStyle}>
              <FaTachometerAlt className="text-lg" />
              Dashboard Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/all-users" className={navLinkStyle}>
              <FaUsers className="text-lg" />
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-articles" className={navLinkStyle}>
              <FaNewspaper className="text-lg" />
              All Articles
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-publisher" className={navLinkStyle}>
              <FaPlusCircle className="text-lg" />
              Add Publisher
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
