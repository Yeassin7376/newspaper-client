import React from 'react';
import TrendingArticlesSlider from './TrendingArticlesSlider/TrendingArticlesSlider';
import AllPublishers from './AllPublishers/AllPublishers';
import StatisticPage from './StatisticPage/StatisticPage';

const Home = () => {
    return (
        <div>
            <TrendingArticlesSlider></TrendingArticlesSlider>
            <AllPublishers></AllPublishers>
            <StatisticPage></StatisticPage>
        </div>
    );
};

export default Home;