import React from 'react';
import SortMoviesContainer from '../SortMovies/SortMovies.container';

interface SearchEpisodeComponentProps {
  onSearchChange: (searchText: string) => void;
  onSortChange: (sortBy: string) => void;
}

const SearchEpisode: React.FC<SearchEpisodeComponentProps> = ({ onSearchChange, onSortChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleSortChange = (newSortingOption: 'episode_id' | 'release_date') => {
    onSortChange(newSortingOption);
  };
  
  return (
    <div className='container-movie'>
      <SortMoviesContainer onSortChange={handleSortChange}/>
      <input 
        className='form-control search-movie'
        type="text"
        placeholder="Type to search..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchEpisode;
