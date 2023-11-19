import React, { useState } from 'react';
import MovieTableContainer from '../components/MovieTable/MovieTable.container';

const HomePage: React.FC = () => {

  return (
    <div>
      <h1>Star Wars Saga Movies Table</h1>
      <MovieTableContainer />
    </div>
  );
};

export default HomePage;
