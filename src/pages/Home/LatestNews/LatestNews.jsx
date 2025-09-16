import React, { useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await axiosInstance.get('/articles/latest?limit=6');
        setLatestNews(res.data);
      } catch (err) {
        console.error('Error fetching latest news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, [axiosInstance]);

  return (
    <div className="">
      {/* Section Title */}
      <h2 className="text-3xl font-bold mb-6 ">📰 Latest News</h2>

      {/* News Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestNews.map((news) => (
          <div key={news._id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition">
            <figure>
              <img src={news.image} alt={news.title} className="h-48  w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title line-clamp-2 text-lg">{news.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{news.description}</p>
              <div className="card-actions justify-end">
                <a href={`/articles/${news._id}`} className="btn btn-sm btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fallback when no news */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card bg-base-200 shadow-xl animate-pulse">
              <figure className="h-48 w-full bg-gray-300 dark:bg-gray-700"></figure>
              <div className="card-body">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="card-actions justify-end mt-2">
                  <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : latestNews.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No latest news available.</p>
      ) : null}
    </div>
  );
};

export default LatestNews;
