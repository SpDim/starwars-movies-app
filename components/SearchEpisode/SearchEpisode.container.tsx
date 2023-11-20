import React, { useEffect, useState } from 'react';
import SearchEpisode from './SearchEpisode.component';
import MoviesTable from '../MoviesTable/MoviesTable.component';
import MovieDetails from '../MovieDetails/MovieDetails.component';
import { Movie } from '../../interfaces';
import SortMoviesContainer from '../SortMovies/SortMovies.container';

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
  const [sortBy, setSortBy] = useState<'episode_id' | 'release_date' | null>(null);

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

  useEffect(() => {
    const sortedMovies = [...movies];

    if (sortBy === 'episode_id') {
      sortedMovies.sort((a, b) => a.episode_id - b.episode_id);
    } else if (sortBy === 'release_date') {
      sortedMovies.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    }

    console.log('Sorted movies:', sortedMovies);

    setFilteredMovies(sortedMovies);
    setMovies(sortedMovies);
  }, [sortBy]);

  const handleSearchChange = (text: string) => {
    const filtered = movies.filter((movie) => movie.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredMovies(filtered);
    setSearchText(text);
    setSelectedMovie(null);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleSortChange = (newSortingOption: 'episode_id' | 'release_date') => {
    setSortBy(newSortingOption);
  };

  return (
    <>
      <h4>{header}</h4><br />
      <SearchEpisode onSearchChange={handleSearchChange} onSortChange={handleSortChange}/>
      {/* <SortMoviesContainer onSortChange={handleSortChange}/> */}
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
