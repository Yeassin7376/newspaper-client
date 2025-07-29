import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // States for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Get all users with pagination
  const { data, isLoading } = useQuery({
    queryKey: ['users', page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  // Mutation for promoting user to admin
  const makeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/user/${userId}`, { role: 'admin' });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Swal.fire('Success', 'User promoted to admin.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Could not promote user.', 'error');
    },
  });

  const handleMakeAdmin = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will become an admin.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, make admin',
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(userId);
      }
    });
  };

  const totalPages = data?.totalPages || 1;

  if (isLoading) {
    return <div className="text-center my-10">Loading users...</div>;
  }

  return (
    <div className="mt-10 px-4 space-y-6">
      <h2 className="text-2xl font-semibold">All Users</h2>

      {/* Page Limit Selector */}
      <div className="flex items-center gap-2">
        <label className="font-medium">Users per page:</label>
        <select
          className="select select-bordered select-sm"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1); // Reset to first page when limit changes
          }}
        >
          {[1, 5, 10, 20, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border rounded-lg">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user, index) => (
              <tr key={user._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>
                  <img
                    src={user.photoURL || '/default-avatar.png'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'admin' ? (
                    <span className="text-green-600 font-medium">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs btn-primary"
                      disabled={makeAdminMutation.isPending}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <div className="join">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="join-item btn btn-sm"
            disabled={page === 1}
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`join-item btn btn-sm ${page === i + 1 ? 'btn-active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="join-item btn btn-sm"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
