import React from 'react';
import SearchBoxContainer from '../components/SearchEpisode/SearchEpisode.container';
import { fetchEpisodes } from './api/episodes';

const HomePage: React.FC = () => {
  return (
    <div>
      <SearchBoxContainer fetchEpisodes={fetchEpisodes}/>
    </div>
  );
};

export default HomePage;
