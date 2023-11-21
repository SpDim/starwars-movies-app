import React, { useEffect, useState } from 'react';
import { Movie } from '../../interfaces';
import MovieDetails from '../MovieDetails/MovieDetails.component';
import { CircularProgress } from '@mui/material';
import decimalToRomanNumerals from '../../utils/convertNumbers';

interface MovieTableComponentProps {
  ratings: Object | undefined;
  averageRating: React.JSX.Element;
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
  selectedMovie: Movie | null;
  handleMovieSelect: (movie: Movie) => void;
}

const MovieTable: React.FC<MovieTableComponentProps> = ({ movies, selectedMovie, handleMovieSelect, onMovieSelect, ratings, averageRating }) => {
    const episode: string = "Episode";
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (movies && movies.length) {
        setLoading(false);
      }
    }, [movies]);

    const renderTableOrSpinner = (): React.JSX.Element => {
      return (!loading ? (
        <div className='movies'>
            <div className="table-responsive">
              <table className="table table-hover">
                <tbody>
                  {movies.map((movie) => (
                    <tr
                      key={movie.episode_id}
                      onClick={() => handleMovieSelect(movie)}
                    >
                      <td scope="row">{`${episode.toUpperCase()} ${movie.episode_id}`}</td>
                      <td>{episode + " " + decimalToRomanNumerals(movie.episode_id) + " - " + movie.title}</td>
                      {/* <td>{averageRating}</td> */}
                      <td>{movie.release_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          {selectedMovie && (
            <div className="table-details">
              <div className="poster-container">
                <img src={selectedMovie?.poster_url} alt={`Movie poster of ${selectedMovie.title}`} className="poster-preview"/>
              </div>
              <div>
                <MovieDetails ratings={ratings} selectedMovie={selectedMovie} />
              </div>
            </div>
          )}
        </div>
      ) :
      <div className='container'>
        <CircularProgress color="inherit"/>
      </div>);
    }

    return (renderTableOrSpinner());
}

export default MovieTable;
