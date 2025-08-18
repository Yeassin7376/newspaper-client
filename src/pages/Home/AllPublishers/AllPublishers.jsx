import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllPublishers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: publishers = [], isLoading, isError } = useQuery({
    queryKey: ['all-publishers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/publishers');
      return res.data;
    }
  });

  if (isLoading) return <span className="loading loading-bars loading-sm"></span>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load publishers.</div>;

  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-6">All Publishers</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {publishers.map((publisher) => (
          <div
            key={publisher._id}
            className=" rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition duration-300 bg-base-200"
          >
            <img
              src={publisher.logoUrl || '/default-logo.png'}
              alt={publisher.displayName}
              className="w-28 h-28 object-contain mb-3"
            />
            <h3 className="text-lg font-semibold text-center">{publisher.displayName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPublishers;
