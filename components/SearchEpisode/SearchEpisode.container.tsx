import React, { useEffect, useState } from 'react';
import SearchEpisode from './SearchEpisode.component';
import MoviesTable from '../MoviesTable/MoviesTable.component';
import MovieDetails from '../MovieDetails/MovieDetails.component';
import { Movie } from '../../interfaces';

interface SearchEpisodeContainerProps {
//   movies: Movie[];
  fetchEpisodes: () => Promise<Movie[]>;
}

const SearchEpisodeContainer: React.FC<SearchEpisodeContainerProps> = ({ fetchEpisodes }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const initialHeader: string = "Please select a film to see details, such as opening crawl and director."
  const [header, setHeader] = useState(initialHeader);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await fetchEpisodes();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };

    fetchData();
  }, [fetchEpisodes]);

  useEffect(() => {
      if (selectedMovie) {
        return setHeader("Star Wars Saga Movies Table");
      }
      setHeader(initialHeader);

  }, [selectedMovie]);

  const handleSearchChange = (text: string) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(filtered);
    setSearchText(text);
    setSelectedMovie(null);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <h3>{header}</h3>
      <SearchEpisode onSearchChange={handleSearchChange} />
      <MoviesTable 
        movies={searchText ? filteredMovies : movies} 
        onMovieSelect={handleMovieSelect}
        selectedMovie={selectedMovie}
        handleMovieSelect={handleMovieSelect} 
      />
      {/* <MovieDetails selectedMovie={selectedMovie} /> */}
    </>
  );
};

export default SearchEpisodeContainer;
