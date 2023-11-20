import React, { useState } from 'react';
import MovieTableContainer from '../components/MoviesTable/MovieTable.container';
import MovieDetailsContainer from '../components/MovieDetails/MovieDetails.container';
import SearchBoxContainer from '../components/SearchEpisode/SearchEpisode.container';
import { fetchEpisodes } from './api/episodes';

const HomePage: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  // const [header, setHeader] = useState("Star Wars Saga Movies Table");

  // const onChangeHeader = () => {
  //   if (!selectedMovie) {
  //     setHeader(<>Please select a movie to see more details.</>)
  //   }
  // }

  // useEffect(() => {
  //   onChangeHeader();
  // }, []);

  const handleMovieSelect = (movie: any | null) => {
    setSelectedMovie(movie);
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <div>
      {/* <h1>Star Wars Saga Movies Table</h1> */}
      <SearchBoxContainer fetchEpisodes={fetchEpisodes}/>
      {/* <MovieTableContainer onMovieSelect={handleMovieSelect} /> */}
      {/* <MovieDetailsContainer selectedMovie={selectedMovie} /> */}
    </div>
  );
};

export default HomePage;
