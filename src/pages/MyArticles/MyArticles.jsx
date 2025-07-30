import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import UpdateArticle from '../UpdateArticle/UpdateArticle';

const MyArticles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedReason, setSelectedReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch articles
  const {
    data: articles = [],
    isLoading,
    refetch
  } = useQuery({
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

  if (isLoading) return <span className="loading loading-bars loading-sm"></span>;

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
                <td>
                  <p className="max-w-[200px] truncate cursor-pointer" title={article.title}>
                    {article.title}
                  </p>
                </td>

                <td>
                  <span
                    className={`badge ${article.status === 'approved' ? 'badge-success' : article.status === 'declined' ? 'badge-error' : 'badge-warning'}`}>
                    {article.status}
                  </span>
                  {article.status === 'declined' && article.declineReason && (
                    <button onClick={() => openReasonModal(article.declineReason)} className="ml-2 btn btn-xs btn-outline btn-error">
                      View Reason
                    </button>
                  )}
                </td>
                <td>{article.isPremium ? 'Yes' : 'No'}</td>
                <td className="flex gap-2 flex-wrap">
                  <Link to={`/articleDetails/${article._id}`} className="btn btn-xs btn-info">
                    Details
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedArticle(article); // set current article to update
                      setShowUpdate(true); // show modal
                    }}
                    className="btn btn-xs btn-warning">
                    Update
                  </button>
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
      {showUpdate && selectedArticle && (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-amber-100 rounded-md max-w-2xl w-full p-6">
            <UpdateArticle
              article={selectedArticle}
              onClose={() => {
                setShowUpdate(false);
                setSelectedArticle(null);
              }}
              refetch={refetch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
