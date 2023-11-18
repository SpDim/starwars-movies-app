import React from 'react';
import { Movie } from '../../interfaces';

interface MovieTableProps {
  movies: Movie[];
}

const MovieTable: React.FC<MovieTableProps> = ({ movies }) => (
  <table>
    <thead>
      <tr>
        <th>Episode</th>
        <th>Official Title</th>
        <th>Release Date</th>
      </tr>
    </thead>
    <tbody>
      {movies.map((movie, index) => (
        <tr key={index}>
          <td>{movie.episode_id}</td>
          <td>{movie.title}</td>
          <td>{movie.release_date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default MovieTable;
