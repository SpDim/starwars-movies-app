// containers/MovieTableContainer.tsx

import React, { useState, useEffect } from 'react';
import MovieTable from './MoviesTable.component';
import { Movie } from '../../interfaces';

interface MovieTableContainerProps {};

const MovieTableContainer: React.FC<MovieTableContainerProps> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/?format=json');
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return <MovieTable movies={movies} />;
};

export default MovieTableContainer;
