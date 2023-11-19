import React, { useState } from 'react';
import MovieTableContainer from '../components/MoviesTable/MovieTable.container';
import MovieDetailsContainer from '../components/MovieDetails/MovieDetails.container';

const HomePage: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  const handleMovieSelect = (movie: any | null) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <h1>Star Wars Saga Movies Table</h1>
      <MovieTableContainer onMovieSelect={handleMovieSelect} />
      {/* <MovieDetailsContainer selectedMovie={selectedMovie} /> */}
    </div>
  );
};

export default HomePage;
