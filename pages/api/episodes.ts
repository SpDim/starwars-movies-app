import { Movie } from "../../interfaces";

export const fetchEpisodes = async (): Promise<Movie[]> => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FILMS_ENDPOINT);
  
      if (!response.ok) {
        throw new Error('Failed to fetch episodes from current endpoint');
      }
  
      const data = await response.json();
      return data.results as Movie[];
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  };