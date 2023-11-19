import React from 'react';
import MovieDetails from './MovieDetails.component';
import { Movie } from '../../interfaces';

interface MovieDetailsContainerProps {
  selectedMovie: Movie | null;
}

const MovieDetailsContainer: React.FC<MovieDetailsContainerProps> = ({ selectedMovie }) => {
  return <MovieDetails selectedMovie={selectedMovie} />;
};

export default MovieDetailsContainer;
