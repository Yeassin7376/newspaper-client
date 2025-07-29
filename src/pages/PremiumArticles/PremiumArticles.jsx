import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router';

const PremiumArticles = () => {
  const axiosSecure = useAxios();

  // ✅ Fetch Premium Articles
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['premiumArticles'],
    queryFn: async () => {
      const res = await axiosSecure.get('/articles/premium');
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    // Increase view count on mount
    const handleViewCount = (id) => {
        if (!id) return;
        axiosSecure.patch(`/articles/views/${id}`)
      };
    

  return (
    <div className="grid gap-6 px-5 py-10 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <div key={article._id} className="card bg-base-100 shadow-md">
          <figure>
            <img src={article.image} alt={article.title} className="h-48 w-full object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{article.title}</h2>
            <p className="text-sm text-gray-500">Publisher: {article.publisher}</p>
            <p className="text-sm">{article.description.slice(0, 100)}...</p>
            <div className="card-actions justify-end">
              <Link to={`/articleDetails/${article._id}`} onClick={() => handleViewCount(article._id)} className="btn btn-sm btn-primary w-full text-center">
                Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PremiumArticles;
