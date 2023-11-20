import React from 'react';
import { Movie } from '../../interfaces';

interface MovieDetailsComponentProps {
  selectedMovie: Movie | null;
}

const MovieDetails: React.FC<MovieDetailsComponentProps> = React.memo(({ selectedMovie }) => {
  if (selectedMovie) {
    console.log('Episode is selected');
  } else {
    console.log('No episodes have been selected yet');    
  }

  return (
    <div className='container'>
      {selectedMovie && (
        <div>
          <h3>{selectedMovie.title}</h3>

          <div className='movie-details'>
              {selectedMovie.opening_crawl}
          </div><br />

          <p>Directed by: {selectedMovie.director}</p>
        </div>
      )}
    </div>
  );
});

export default MovieDetails;
