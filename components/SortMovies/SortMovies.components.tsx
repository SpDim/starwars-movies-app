import React from 'react';

interface SortButtonComponentProps {
  onSortChange: (sortBy: 'episode_id' | 'release_date') => void;
}

const SortMovies: React.FC<SortButtonComponentProps> = ({ onSortChange }) => {
  const handleSortChange = (sortBy: 'episode_id' | 'release_date') => {
      onSortChange(sortBy);
  };
  
  return (
    <div>
        <button onClick={() => handleSortChange('episode_id')}>Sort by Episode</button>
        <button onClick={() => handleSortChange('release_date')}>Sort by Release Date</button>
    </div>
  );
};

export default SortMovies;
