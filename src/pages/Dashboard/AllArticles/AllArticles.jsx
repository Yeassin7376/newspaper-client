import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AllArticlesAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // articles per page

  // Fetch all articles with pagination
  const { data = {}, isLoading } = useQuery({
    queryKey: ['articles', page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles?page=${page}&limit=${limit}`);
      return res.data;
    }
  });

  const articles = data.articles || [];
  const totalPages = data.totalPages || 1;

  // Approve article mutation
  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/articles/approve/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      toast.success('Article approved');
    },
    onError: () => {
      toast.error('Failed to approve article');
    }
  });

  // Decline article mutation
  const declineMutation = useMutation({
    mutationFn: ({ id, reason }) => axiosSecure.patch(`/articles/decline/${id}`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      toast.success('Article declined');
    },
    onError: () => {
      toast.error('Failed to decline article');
    }
  });

  // Delete article mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/articles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      toast.success('Article deleted');
    },
    onError: () => {
      toast.error('Failed to delete article');
    }
  });

  // Toggle premium mutation
  const togglePremiumMutation = useMutation({
    mutationFn: ({ id, current }) => axiosSecure.patch(`/articles/premium/${id}`, { isPremium: !current }),
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      toast.success('Premium status updated');
    },
    onError: () => {
      toast.error('Failed to toggle premium');
    }
  });

  const handleApprove = (id) => approveMutation.mutate(id);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the article!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const handleDecline = async (id) => {
    const { value: reason } = await Swal.fire({
      title: 'Decline Article',
      input: 'textarea',
      inputLabel: 'Reason for decline',
      inputPlaceholder: 'Write the reason here...',
      showCancelButton: true,
      confirmButtonText: 'Submit'
    });

    if (reason) {
      declineMutation.mutate({ id, reason });
    }
  };

  const handleTogglePremium = (id, isPremium) => {
    togglePremiumMutation.mutate({ id, current: isPremium });
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  if (isLoading) return <div className="text-center py-10">Loading articles...</div>;

  return (
    <div className="px-4 mt-8">
      <h2 className="text-2xl font-semibold mb-4">All Articles</h2>

      {/* Limit selector */}
      <div className="mb-4">
        <label className="mr-2">Articles per page:</label>
        <select value={limit} onChange={handleLimitChange} className="select select-sm select-bordered">
          {[1, 5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Publisher</th>
              <th>Status</th>
              <th>Posted</th>
              <th>Premium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, idx) => (
              <tr key={article._id}>
                <td>{(page - 1) * limit + idx + 1}</td>
                <td>
                  <p className="max-w-[200px] truncate cursor-pointer" title={article.title}>
                    {article.title}
                  </p>
                </td>

                <td>{article.authorName}</td>
                <td>{article.authorEmail}</td>
                <td>
                  <img src={article.authorPhoto || '/default-avatar.png'} className="w-10 h-10 rounded-full" />
                </td>
                <td>{article.publisher}</td>
                <td>
                  <span className={`badge ${article.status === 'approved' ? 'badge-success' : 'badge-warning'}`}>{article.status}</span>
                </td>
                <td>{new Date(article.created_at).toLocaleDateString()}</td>
                <td>{article.isPremium ? <span className="badge badge-accent">Premium</span> : <span className="text-gray-500">—</span>}</td>
                <td className="flex flex-col gap-1">
                  {article.status !== 'approved' && (
                    <button onClick={() => handleApprove(article._id)} className="btn btn-xs btn-primary">
                      Approve
                    </button>
                  )}
                  {/* Decline button */}
                  {article.status !== 'declined' && (
                    <button onClick={() => handleDecline(article._id)} className="btn btn-xs btn-warning">
                      Decline
                    </button>
                  )}
                  <button onClick={() => handleDelete(article._id)} className="btn btn-xs btn-error">
                    Delete
                  </button>
                  <button
                    onClick={() => handleTogglePremium(article._id, article.isPremium)}
                    className={`btn btn-xs ${article.isPremium ? 'btn-outline btn-warning' : 'btn-accent'}`}>
                    {article.isPremium ? 'Remove Premium' : 'Make Premium'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button className="btn btn-sm" onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button className="btn btn-sm" onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AllArticlesAdmin;
