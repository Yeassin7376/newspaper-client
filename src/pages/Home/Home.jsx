import React from 'react';
import TrendingArticlesSlider from './TrendingArticlesSlider/TrendingArticlesSlider';
import AllPublishers from './AllPublishers/AllPublishers';
import StatisticPage from './StatisticPage/StatisticPage';
import PlanSection from './PlanSection/PlanSection';
import LatestNews from './LatestNews/LatestNews';
import OpinionEditorial from './OpinionEditorial/OpinionEditorial';
import VideoHighlightsCarousel from './VideoHighlightsCarousel/VideoHighlightsCarousel';
import HeroBreakingNews from './HeroBreakingNews/HeroBreakingNews';
import ThematicNewsBlocks from './ThematicNewsBlocks/ThematicNewsBlocks';

const Home = () => {
  return (
    <div>
      <section className='mb-10'>
        <HeroBreakingNews></HeroBreakingNews>
      </section>
      <section className='my-10'>
        <TrendingArticlesSlider></TrendingArticlesSlider>
      </section>
      <section className='my-10'>
        <LatestNews></LatestNews>
      </section>
      <section className='my-10'>
        <AllPublishers></AllPublishers>
      </section>
      <section className='my-10'>
        <StatisticPage></StatisticPage>
      </section>
      <section className='my-10'>
        <OpinionEditorial></OpinionEditorial>
      </section>
      <section className='my-10'>
        <VideoHighlightsCarousel></VideoHighlightsCarousel>
      </section>
      <section className='my-10'>
        <ThematicNewsBlocks></ThematicNewsBlocks>
      </section>
      <section className='my-10'>
        <PlanSection></PlanSection>
      </section>
      
    </div>
  );
};

export default Home;
