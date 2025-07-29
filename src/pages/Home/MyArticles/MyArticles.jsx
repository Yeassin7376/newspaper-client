import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MyArticles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedReason, setSelectedReason] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Fetch articles
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['myArticles', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/user?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Delete article mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/articles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['myArticles', user?.email]);
      toast.success('Article deleted');
    },
    onError: () => toast.error('Failed to delete article')
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You cannot undo this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const openReasonModal = (reason) => {
    setSelectedReason(reason);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedReason('');
    setShowModal(false);
  };

  if (isLoading) return <div className="text-center py-10">Loading your articles...</div>;

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Articles</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Premium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, idx) => (
              <tr key={article._id}>
                <td>{idx + 1}</td>
                <td>{article.title}</td>
                <td>
                  <span
                    className={`badge ${
                      article.status === 'approved'
                        ? 'badge-success'
                        : article.status === 'declined'
                        ? 'badge-error'
                        : 'badge-warning'
                    }`}
                  >
                    {article.status}
                  </span>
                  {article.status === 'declined' && article.declineReason && (
                    <button
                      onClick={() => openReasonModal(article.declineReason)}
                      className="ml-2 btn btn-xs btn-outline btn-error"
                    >
                      View Reason
                    </button>
                  )}
                </td>
                <td>{article.isPremium ? 'Yes' : 'No'}</td>
                <td className="flex gap-2 flex-wrap">
                  <Link to={`/articleDetails/${article._id}`} className="btn btn-xs btn-info">
                    Details
                  </Link>
                  <Link to={`/dashboard/update-article/${article._id}`} className="btn btn-xs btn-warning">
                    Update
                  </Link>
                  <button onClick={() => handleDelete(article._id)} className="btn btn-xs btn-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decline Reason Modal */}
      {showModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-600">Decline Reason</h3>
            <p className="py-4">{selectedReason}</p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyArticles;
