import React, { useState } from 'react';
import { Movie } from '../../interfaces';
import MovieDetails from '../MovieDetails/MovieDetails.component';

interface MovieTableComponentProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
  selectedMovie: Movie | null;
  handleMovieSelect: (movie: Movie) => void;
}

const MovieTable: React.FC<MovieTableComponentProps> = ({ movies, selectedMovie, handleMovieSelect, onMovieSelect }) => {
    const episode: string = "EPISODE";

    return (
        <div className='movies'>
            <div className="table-responsive">
              <table className="table table-hover">
                <tbody>
                  {movies.map((movie) => (
                    <tr
                      key={movie.episode_id}
                      onClick={() => onMovieSelect(movie)}
                    >
                      <td scope="row">{`${episode} ${movie.episode_id}`}</td>
                      <td>{`${episode} ${movie.episode_id} - ${movie.title}`}</td>
                      <td>{movie.release_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          {selectedMovie && (
            <div className='table-details'>
              <MovieDetails selectedMovie={selectedMovie} />
            </div>
          )}
        </div>
    );
}

export default MovieTable;
