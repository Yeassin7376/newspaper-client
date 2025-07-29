import React from 'react';
import TrendingArticlesSlider from './TrendingArticlesSlider/TrendingArticlesSlider';
import AllPublishers from './AllPublishers/AllPublishers';
import StatisticPage from './StatisticPage/StatisticPage';
import PlanSection from './PlanSection/PlanSection';

const Home = () => {
  return (
    <div>
      <TrendingArticlesSlider></TrendingArticlesSlider>
      <AllPublishers></AllPublishers>
      <StatisticPage></StatisticPage>
      <PlanSection></PlanSection>
    </div>
  );
};

export default Home;
