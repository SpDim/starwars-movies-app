import React from 'react';
import SortMovies from './SortMovies.components';

interface SortMoviesContainerProps {
  onSortChange: (sortBy: 'episode_id' | 'release_date') => void;
}

const SortMoviesContainer: React.FC<SortMoviesContainerProps> = ({ onSortChange }) => {  
  return <SortMovies onSortChange={onSortChange} />;
};

export default SortMoviesContainer;
