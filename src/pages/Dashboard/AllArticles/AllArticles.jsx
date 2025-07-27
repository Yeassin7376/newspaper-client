import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['all-articles'],
    queryFn: async () => {
      const res = await axiosSecure.get('/articles');
      return res.data;
    }
  });

  const { articles } = data || {};

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/articles/approve/${id}`);
      queryClient.invalidateQueries(['all-articles']);
      Swal.fire('Approved!', 'The article is now published.', 'success');
    } catch (error) {
        console.error('Failed to approve article:', error);
      Swal.fire('Error', 'Could not approve the article.', 'error');
    }
  };

  const handleTogglePremium = async (id, currentStatus) => {
    try {
      const res = await axiosSecure.patch(`/articles/premium/${id}`, {
        isPremium: !currentStatus
      });
      console.log(res.data);
      if (res.data.result.modifiedCount > 0) {
        toast.success(`Article is now ${!currentStatus ? 'Premium' : 'Standard'}`);
        refetch(); // or queryClient.invalidateQueries
      }
    } catch (error) {
        console.error('Failed to update premium status:', error);
      toast.error('Failed to update premium status.');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this article!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/articles/${id}`);
        queryClient.invalidateQueries(['all-articles']);
        Swal.fire('Deleted!', 'The article has been deleted.', 'success');
      } catch (error) {
        console.error('Failed to delete article:', error);
        Swal.fire('Error', 'Could not delete the article.', 'error');
      }
    }
  };

  const handleDecline = async (id) => {
    const { value: reason } = await Swal.fire({
      title: 'Decline Reason',
      input: 'textarea',
      inputLabel: 'Reason for decline',
      inputPlaceholder: 'Write your reason here...',
      showCancelButton: true
    });

    if (reason) {
      try {
        await axiosSecure.patch(`/articles/decline/${id}`, { reason });
        queryClient.invalidateQueries(['all-articles']);
        Swal.fire('Declined!', 'The article has been declined.', 'info');
      } catch (error) {
        console.error('Failed to decline article:', error);
        Swal.fire('Error', 'Could not decline the article.', 'error');
      }
    }
  };

  if (isLoading) {
    return <div className="text-center my-10">Loading articles...</div>;
  }

  return (
    <div className="overflow-x-auto p-4 mt-6">
      <h2 className="text-2xl font-bold mb-4">All Articles</h2>
      <table className="table w-full border rounded-lg">
        <thead className="bg-base-200 text-base-content">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Posted Date</th>
            <th>Status</th>
            <th>Publisher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={article._id}>
              <td>{index + 1}</td>
              <td>{article.title}</td>
              <td>{article.authorName}</td>
              <td>{article.authorEmail}</td>
              <td>
                <img src={article.authorPhoto || '/default-avatar.png'} alt="Author" className="w-10 h-10 rounded-full" />
              </td>
              <td>{new Date(article.created_at).toLocaleDateString()}</td>
              <td>{article.status}</td>
              <td>{article.publisher}</td>
              <td className="flex flex-col gap-1">
                {article.status === 'pending' && (
                  <>
                    <button onClick={() => handleApprove(article._id)} className="btn btn-xs btn-success">
                      Approve
                    </button>
                    <button onClick={() => handleDecline(article._id)} className="btn btn-xs btn-warning">
                      Decline
                    </button>
                  </>
                )}
                  <button
                    onClick={() => handleTogglePremium(article._id, article.isPremium)}
                    className={`btn btn-xs ${article.isPremium ? 'btn-outline btn-warning' : 'btn-accent'}`}>
                    {article.isPremium ? 'Remove Premium' : 'Make Premium'}
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
  );
};

export default AllArticles;
