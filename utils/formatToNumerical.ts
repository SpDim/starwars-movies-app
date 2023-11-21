import { Movie } from "../interfaces";

const getNumericalInRating = (ratings: Object, selectedMovie: Movie) => {
    if (ratings) {
      const rating: string = selectedMovie?.imdb_rating;
      
      if (rating && rating.includes("/")) {
        const ratingFloat = parseFloat(rating.substring(0, rating.indexOf("/")));
        return Math.floor(ratingFloat);
      } else if (rating && rating.includes("%")) {
        const ratingFloat = parseFloat(rating.substring(0, rating.indexOf("%")));
        return Math.floor(ratingFloat)
      }
      return Math.floor(parseFloat(rating));
    }
}

export default getNumericalInRating;
