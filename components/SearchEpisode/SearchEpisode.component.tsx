import React from 'react';
import SortMovies from '../SortMovies/SortMovies.components';
import SortMoviesContainer from '../SortMovies/SortMovies.container';

interface SearchEpisodeComponentProps {
  // sortTerm: string;
  onSearchChange: (searchText: string) => void;
  onSortChange: (sortBy: string) => void;
}

// const SearchEpisode: React.FC<SearchEpisodeComponentProps> = ({ onSearchChange }) => (
//     <div className='container-movie'>
//       <input className='search-movie'
//         type="text"
//         placeholder="Type to search..."
//         onChange={(e) => onSearchChange(e.target.value)}
//       />
//     </div>
// );

const SearchEpisode: React.FC<SearchEpisodeComponentProps> = ({ onSearchChange, onSortChange }) => {
  // const sortBy = sortTerm;
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
