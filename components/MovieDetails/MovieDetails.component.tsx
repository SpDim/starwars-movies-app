import React from 'react';
import { Movie } from '../../interfaces';

interface MovieDetailsComponentProps {
  selectedMovie: Movie | null;
}

const MovieDetails: React.FC<MovieDetailsComponentProps> = ({ selectedMovie }) => {
  if (selectedMovie) {
    console.log('Episode is selected');
  } else {
    console.log('No episodes have been selected yet');    
  }

  return (
    <div className='container'>
      {selectedMovie && (
        <div>
          {/* <h2>{selectedMovie.opening_crawl}</h2> */}

          <h3>{selectedMovie.title}</h3>
          {/* <table className="table table-hover">
              <tbody>
                  <tr>
                      <td>{selectedMovie.opening_crawl}</td>
                  </tr>
              </tbody>
          </table> */}
          <div className='movie-details'>
              {selectedMovie.opening_crawl}
          </div><br />

          <p>Directed by: {selectedMovie.director}</p>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
