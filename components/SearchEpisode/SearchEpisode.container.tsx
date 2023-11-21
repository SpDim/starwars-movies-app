import React, { useEffect, useMemo, useState } from 'react';
import SearchEpisode from './SearchEpisode.component';
import MoviesTable from '../MoviesTable/MoviesTable.component';
import { Movie, Omdp } from '../../interfaces';
import decimalToRomanNumerals from '../../utils/convertNumbers';
import StarRatingComponent from '../StarRating/StarRating.component';

interface SearchEpisodeContainerProps {
  fetchEpisodes: () => Promise<Movie[]>;
}

const SearchEpisodeContainer: React.FC<SearchEpisodeContainerProps> = ({ fetchEpisodes }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const initialHeader: string = "Please select a film to see details, such as opening crawl, director and ratings."
  const [header, setHeader] = useState(initialHeader);
  const [sortBy, setSortBy] = useState<'episode_id' | 'release_date' | null>(null);
  const [ratings, setRatings] = useState<Object | undefined>({});

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
    } else {
      setHeader(initialHeader);
    }

  }, [selectedMovie]);

  useEffect(() => {
    fetchPosterUrls();
    fetchRatings();
  }, [selectedMovie]);
  

  const fetchPosterUrls = async () => {
    const currentMovies = [...movies];

    const updatedMovies = await Promise.all(
      currentMovies.map(async (movie) => {
        try {
          const endpoint = "Star Wars: Episode " + decimalToRomanNumerals(selectedMovie?.episode_id) + " - " + selectedMovie?.title;
          const response = await fetch(`${process.env.NEXT_PUBLIC_OMDB_URI}&t=${encodeURIComponent(endpoint)}`);
          const data: Omdp = await response.json();

          movie.poster_url = data.Poster || '';
          
          return { 
            ...movie, 
            poster_url: movie.poster_url,
          };
        } catch (error) {
          console.error(`Error fetching poster for ${movie.title}:`, error);
          return { ...movie, poster_url: '' };
        }
      })
    );

    setMovies(updatedMovies);
  };



  const fetchRatings = async () => {
    const currentMovies = [...movies];
    const allRatings: Object[] = [];
    
    const updatedRatings = await Promise.all(
        currentMovies.map(async (movie) => {
            try {
                const endpoint = "Star Wars: Episode " + decimalToRomanNumerals(selectedMovie?.episode_id) + " - " + selectedMovie?.title;
                const response = await fetch(`${process.env.NEXT_PUBLIC_OMDB_URI}&t=${encodeURIComponent(endpoint)}`);
                const data: Omdp = await response.json();
                
                if (data && data.Ratings && data.Ratings.length) {
                    movie.imdb_rating = data?.Ratings[0]?.Value || "N/A";
                    movie.rotten_tomatoes_rating = data?.Ratings[1]?.Value || "N/A";
                    movie.metacritic_rating = data?.Ratings[2]?.Value || "N/A";
                }
                
                const episode_id = movie.episode_id;
                const imdbRating = movie.imdb_rating;
                const rottenTom = movie.rotten_tomatoes_rating;
                const metacritic = movie.metacritic_rating;
                
                const ratingsObj = {
                    episode_id,
                    ratings: {
                        imdb: imdbRating,
                        rotten_tomatoes: rottenTom,
                        metacritic: metacritic
                    }
                }

                allRatings.push(ratingsObj);
                return allRatings;
            } catch (error) {
                console.error(`Error fetching ratings for ${selectedMovie}:`, error);
                return;
            }
        })
    );
    
    setRatings(updatedRatings[0]);
  }
  
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

  const calculateAvgRating = () => {
    let sum = 0;
    if (selectedMovie?.imdb_rating) {
      sum += parseFloat(selectedMovie?.imdb_rating)*10;
    }
    if (selectedMovie?.rotten_tomatoes_rating) {
      const rottenTomRating: string = selectedMovie?.rotten_tomatoes_rating;
      sum += parseInt(rottenTomRating.substring(0, rottenTomRating.indexOf("%")));
    }
    if (selectedMovie?.metacritic_rating) {
      sum += Math.floor(parseInt(selectedMovie?.metacritic_rating))
    }
    
    return sum/3;
  }
  const avg = <StarRatingComponent rating={Math.round(parseInt(calculateAvgRating().toString())/10)}/>

  return (
    <>
      <h4>{header}</h4><br />
      <SearchEpisode onSearchChange={handleSearchChange} onSortChange={handleSortChange}/>
      <MoviesTable 
        ratings={ratings}
        movies={sortedAndFilteredMovies} 
        onMovieSelect={handleMovieSelect}
        selectedMovie={selectedMovie}
        handleMovieSelect={handleMovieSelect}
        averageRating={avg}
      />
    </>
  );
};

export default SearchEpisodeContainer;
