import React, { useEffect } from 'react';

interface SortButtonComponentProps {
  onSortChange: (sortBy: "episode_id" | "release_date") => void;
}

const SortMovies: React.FC<SortButtonComponentProps> = ({ onSortChange }) => {
  const handleSortChange = (sortBy: "episode_id" | "release_date") => {
      onSortChange(sortBy);
  };

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');

    return () => {};
  }, []);
  
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButtons"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Sort by...
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButtons">
        <button className="dropdown-item" onClick={() => handleSortChange('episode_id')}>
          Episode
        </button>
        <button className="dropdown-item" onClick={() => handleSortChange('release_date')}>
          Release Date
        </button>
      </div>
    </div>
  );
};

export default SortMovies;
