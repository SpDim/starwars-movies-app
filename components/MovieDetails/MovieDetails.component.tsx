import React from 'react';
import { Movie } from '../../interfaces';
import StarRatingComponent from '../StarRating/StarRating.component';

interface MovieDetailsComponentProps {
  selectedMovie: Movie | null;
  ratings: Object | undefined;
}

const MovieDetails: React.FC<MovieDetailsComponentProps> = React.memo(({ selectedMovie, ratings }) => {
  if (ratings) {
    const episode = Object.values(ratings).filter((item) => item.episode_id == selectedMovie.episode_id);
  }

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

  return (
    <div className='container'>
      {selectedMovie && (
        <div>
          <h3>{selectedMovie.title}</h3>

          <div className='movie-details'>
              {selectedMovie.opening_crawl}
          </div><br />

          <p><b>Directed by:</b> {selectedMovie.director}</p>
          {selectedMovie?.imdb_rating && selectedMovie?.rotten_tomatoes_rating && selectedMovie?.metacritic_rating && (
            <div className='average'>
              <p>Average rating:</p> 
              <div className='star'>
                <StarRatingComponent rating={Math.round(parseInt(calculateAvgRating().toString())/10)}/>
              </div>
            </div>
          )}
          <div className='ratings'>
            Ratings:
            {selectedMovie?.imdb_rating && (
              <div className='rating-box'>Internet Movie Database: {(parseFloat(selectedMovie?.imdb_rating)*10).toString() + "%"}</div>
            )}
            {selectedMovie?.rotten_tomatoes_rating && (
              <div className='rating-box'>Rotten Tomatos: {selectedMovie?.rotten_tomatoes_rating}</div>
            )}
            {selectedMovie?.metacritic_rating && (
              <div className='rating-box'>Metacritic: {Math.floor(parseInt(selectedMovie?.metacritic_rating)).toString() + "%"}</div>
            )}  
          </div>
        </div>
      )}
    </div>
  );
});

export default MovieDetails;
