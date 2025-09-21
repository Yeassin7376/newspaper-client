// src/pages/Home/ThematicNewsBlocks.jsx
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const ThematicNewsBlocks = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch articles by category
  const { data: articlesByCategory = {}, isLoading, isError } = useQuery({
    queryKey: ['thematic-news'],
    queryFn: async () => {
      const res = await axiosSecure.get('/thematicNews'); 
      return res.data;
    }
  });
  console.log(articlesByCategory)

  if (isLoading) return <span className="loading loading-bars loading-lg"></span>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load thematic news.</div>;

  const categories = Object.keys(articlesByCategory);

  return (
    <div className="space-y-12 mt-12">
      {categories.map((category, idx) => (
        <section
          key={category}
          className={`p-6 rounded-lg ${
            idx % 2 === 0 ? 'bg-base-200' : 'bg-base-300'
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">{category} Headlines</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesByCategory[category].slice(0, 3).map((article) => (
              <div
                key={article._id}
                className="card bg-base-100 shadow-md hover:shadow-lg transition"
              >
                <figure>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-40 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{article.description}</p>
                  <Link
                    to={`/articles/${article._id}`}
                    className="btn btn-sm btn-primary mt-3"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ThematicNewsBlocks;
