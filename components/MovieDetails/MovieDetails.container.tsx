import React from 'react';
import MovieDetails from './MovieDetails.component';
import { Movie } from '../../interfaces';

interface MovieDetailsContainerProps {
  ratings: Object | undefined;
  selectedMovie: Movie | null;
}

const MovieDetailsContainer: React.FC<MovieDetailsContainerProps> = ({ selectedMovie, ratings }) => {
  return <MovieDetails selectedMovie={selectedMovie} ratings={ratings} />;
};

export default MovieDetailsContainer;
