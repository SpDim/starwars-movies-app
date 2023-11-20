import React from 'react';

interface SearchEpisodeComponentProps {
  onSearchChange: (searchText: string) => void;
}

const SearchEpisode: React.FC<SearchEpisodeComponentProps> = ({ onSearchChange }) => (
    <div className='container-movie'>
      <input className='search-movie'
        type="text"
        placeholder="Type to search..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
);

export default SearchEpisode;
