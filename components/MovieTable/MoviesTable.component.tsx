import React from 'react';
import { Movie } from '../../interfaces';

interface MovieTableProps {
  movies: Movie[];
}

const MovieTable: React.FC<MovieTableProps> = ({ movies }) => (
    <div className="table-responsive">
      <table className="table table-primary table-hover">
        <thead>
          <tr>
            <th scope="col">Episode</th>
            <th scope="col">Official Title</th>
            <th scope="col">Release Date</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.episode_id} style={{ cursor: 'pointer' }}>
              <th scope="row">{movie.episode_id}</th>
              <td>{movie.title}</td>
              <td>{movie.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);

export default MovieTable;
