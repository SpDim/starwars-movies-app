import React, { useState } from 'react';
import SortMovies from './SortMovies.components';

interface SortMoviesContainerProps {
  onSortChange: (sortBy: 'episode_id' | 'release_date') => void;
}

const SortMoviesContainer: React.FC<SortMoviesContainerProps> = ({ onSortChange }) => {
  const handleSortChange = (sortBy: 'episode_id' | 'release_date') => {
    console.log('Sort option changed to:', sortBy);
    
    onSortChange(sortBy);
  };

  return <SortMovies onSortChange={handleSortChange} />;
};

export default SortMoviesContainer;
