import React from 'react';
import Slider from 'react-slick';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { IoEye } from "react-icons/io5";

const TrendingArticlesSlider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['trendingArticles'],
    queryFn: async () => {
      const res = await axiosSecure.get('/articles/trending?limit=6');
      return res.data;
    }
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  if (isLoading) {
    return <span className="loading loading-bars loading-sm"></span>;
  }

  return (
    <div className="">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">🔥 Trending Articles</h2>
      <Slider {...sliderSettings}>
        {articles.map((article) => (
          <div key={article._id} className="px-2 block h-full">
            <div className="relative rounded-lg overflow-hidden shadow-md h-72 group cursor-pointer">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0  bg-opacity-40 group-hover:bg-opacity-50 transition duration-300" />
              <div className="absolute  w-full bottom-0 p-4 text-white z-10">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <div className="flex justify-between text-sm mt-1">
                  <span>{article.publisher}</span>
                  <span className='flex items-center gap-1'><IoEye /> {article.views}</span>
                  
                </div>
                <div className="mt-3">
                <Link to={`/articleDetails/${article._id}`}>
                  <button className="btn btn-sm btn-success btn-outline w-full">Read More</button>
                </Link>
              </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingArticlesSlider;
