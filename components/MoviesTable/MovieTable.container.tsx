import React, { useState, useEffect } from 'react';
import MovieTable from './MoviesTable.component';
import { Movie } from '../../interfaces';

interface MovieTableContainerProps {
  ratings: Object | undefined;
  averageRating: React.JSX.Element;
  onMovieSelect: (movie: Movie | null) => void;
};

const MovieTableContainer: React.FC<MovieTableContainerProps> = ({ ratings, averageRating, onMovieSelect }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);
  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_FILMS_ENDPOINT);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const containerProps = {
    movies,
    selectedMovie,
    ratings,
    averageRating
  }

  const containerFunctions = {
    onMovieSelect,
    handleMovieSelect
  }

  return <MovieTable {...containerProps} {...containerFunctions} />;
};

export default MovieTableContainer;
