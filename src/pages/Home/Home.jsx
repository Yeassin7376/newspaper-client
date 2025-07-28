import React from 'react';
import TrendingArticlesSlider from './TrendingArticlesSlider/TrendingArticlesSlider';
import AllPublishers from './AllPublishers/AllPublishers';

const Home = () => {
    return (
        <div>
            <TrendingArticlesSlider></TrendingArticlesSlider>
            <AllPublishers></AllPublishers>
        </div>
    );
};

export default Home;