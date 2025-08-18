import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import CountUp from 'react-countup';

// Icons
import { FaUsers, FaUserAlt, FaCrown } from 'react-icons/fa';

const StatisticPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading, isError } = useQuery({
    queryKey: ['user-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/stats');
      return res.data; // { total: 100, normal: 70, premium: 30 }
    }
  });

  const { total = 0, normal = 0, premium = 0 } = data;

  if (isLoading) return <span className="loading loading-bars loading-sm"></span>;
  if (isError) return <div className="text-center text-red-500 py-10">Failed to load statistics.</div>;

  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-8">User Statistics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center flex flex-col items-center">
          <FaUsers className="text-4xl text-blue-600 mb-2" />
          <h3 className="text-xl font-semibold mb-1">Total Users</h3>
          <p className="text-4xl font-bold text-blue-800">
            <CountUp end={total} duration={2} />
          </p>
        </div>

        {/* Normal Users */}
        <div className="bg-green-100 p-6 rounded-lg shadow text-center flex flex-col items-center">
          <FaUserAlt className="text-4xl text-green-600 mb-2" />
          <h3 className="text-xl font-semibold mb-1">Normal Users</h3>
          <p className="text-4xl font-bold text-green-800">
            <CountUp end={normal} duration={2} />
          </p>
        </div>

        {/* Premium Users */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow text-center flex flex-col items-center">
          <FaCrown className="text-4xl text-yellow-600 mb-2" />
          <h3 className="text-xl font-semibold mb-1">Premium Users</h3>
          <p className="text-4xl font-bold text-yellow-800">
            <CountUp end={premium} duration={2} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;
