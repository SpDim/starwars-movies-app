import React, { useEffect, useMemo, useRef, useState } from 'react';
import SearchEpisode from './SearchEpisode.component';
import MoviesTable from '../MoviesTable/MoviesTable.component';
import { Movie } from '../../interfaces';

interface SearchEpisodeContainerProps {
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

  const fetchPosterUrls = async () => {
    const currentMovies = [...movies];

    const updatedMovies = await Promise.all(
      currentMovies.map(async (movie) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_OMDB_URI}&t=${encodeURIComponent(movie.title)}`);
          const data = await response.json();
          return { ...movie, poster_url: data.Poster || '' };
        } catch (error) {
          console.error(`Error fetching poster for ${movie.title}:`, error);
          return { ...movie, poster_url: '' };
        }
      })
    );

    setMovies(updatedMovies);
  };

  useEffect(() => {
    fetchPosterUrls();
  }, [selectedMovie]);
  

  const sortedAndFilteredMovies = useMemo(() => {
    let episodes = [...movies];

    if (sortBy === "episode_id") {
      episodes.sort((a, b) => a.episode_id - b.episode_id);
    } else if (sortBy === "release_date") {
      episodes.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    }

    if (searchText) {
      episodes = episodes.filter(movie => movie.title.toLowerCase().includes(searchText.toLowerCase()));
    }

    return episodes;
  }, [movies, sortBy, searchText]);


  useEffect(() => {
    if (selectedMovie) {
      return setHeader("Star Wars Saga Movies Table");
    } else {
      setHeader(initialHeader);
    }

  }, [selectedMovie]);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setSelectedMovie(null);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleSortChange = (newSortingOption: 'episode_id' | 'release_date') => {
    if (newSortingOption !== sortBy) {
      setSortBy(newSortingOption);
    }
  };

  return (
    <>
      <h4>{header}</h4><br />
      <SearchEpisode onSearchChange={handleSearchChange} onSortChange={handleSortChange}/>
      <MoviesTable 
        movies={sortedAndFilteredMovies} 
        onMovieSelect={handleMovieSelect}
        selectedMovie={selectedMovie}
        handleMovieSelect={handleMovieSelect} 
      />
    </>
  );
};

export default SearchEpisodeContainer;
