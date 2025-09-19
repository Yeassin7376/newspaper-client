import React from 'react';

const HeroBreakingNews = () => {
  // In real app, you can fetch breaking news from backend
  const breakingNews = {
    title: 'Global Summit Reaches Historic Climate Agreement',
    summary:
      'World leaders have signed a landmark deal to reduce emissions and accelerate green energy adoption, marking a turning point in the fight against climate change.',
    imageUrl: 'https://i.ibb.co.com/6cqShS2S/53394930893-784f246ecf-4k-min.png',
    link: '/articles/global-summit-climate-deal'
  };

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center mb-12">
      {/* Background Image */}
      <img src={breakingNews.imageUrl} alt={breakingNews.title} className="absolute inset-0 w-full h-full object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">{breakingNews.title}</h1>
        <p className="text-lg md:text-xl mb-8 drop-shadow-md">{breakingNews.summary}</p>
        <a href={breakingNews.link} className="btn btn-primary btn-lg font-semibold">
          Read Full Story
        </a>
      </div>
    </section>
  );
};

export default HeroBreakingNews;
