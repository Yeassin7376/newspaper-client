import React, { useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await axiosInstance.get('/articles/latest?limit=6');
        setLatestNews(res.data);
      } catch (err) {
        console.error('Error fetching latest news:', err);
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
      {latestNews.length === 0 && <p className="text-center text-gray-500 mt-4">No latest news available.</p>}
    </div>
  );
};

export default LatestNews;
