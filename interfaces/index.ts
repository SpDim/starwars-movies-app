export type Movie = {
  episode_id: number;
  title: string;
  release_date: string;
  director: string;
  opening_crawl: string;
  poster_url?: string;
  imdb_rating?: any;
  rotten_tomatoes_rating?: any;
  metacritic_rating?: any;
}

export type Omdp = {
  Title: string,
  Year: string,
  Released: string,
  Director: string,
  Poster: string,
  Ratings: {
      Source: string,
      Value: string
  }[],
}
