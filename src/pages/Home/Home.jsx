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
import PhotoOfTheDay from './PhotoOfTheDay/PhotoOfTheDay';

const Home = () => {
  return (
    <div>
      <section className='mb-10 w-11/12 mx-auto'>
        <HeroBreakingNews></HeroBreakingNews>
      </section>
      <section className='my-10 w-11/12 mx-auto'>
        <TrendingArticlesSlider></TrendingArticlesSlider>
      </section>
      <section className='my-10 w-11/12 mx-auto'>
        <LatestNews></LatestNews>
      </section>
      <section className='my-10 w-11/12 mx-auto'>
        <AllPublishers></AllPublishers>
      </section>
      <section className='my-10 w-11/12 mx-auto'>
        <StatisticPage></StatisticPage>
      </section>
      <section className='my-10 w-11/12 mx-auto'>
        <OpinionEditorial></OpinionEditorial>
      </section>
      <section>
        <PhotoOfTheDay></PhotoOfTheDay>
      </section>
      <section className='my-10 w-11/12 mx-auto'>
        <VideoHighlightsCarousel></VideoHighlightsCarousel>
      </section>
      <section className='my-10 w-11/12 mx-auto'>
        <ThematicNewsBlocks></ThematicNewsBlocks>
      </section>
      <section className='my-10 w-11/12 mx-auto'>
        <PlanSection></PlanSection>
      </section>
      
    </div>
  );
};

export default Home;
