// import Link from 'next/link'
// import Layout from '../components/Layout'

// const IndexPage = () => (
//   <Layout title="Home | Next.js + TypeScript Example">
//     <h1>Hello Next.js 👋</h1>
//     <p>
//       <Link href="/about">About</Link>
//     </p>
//   </Layout>
// )

// export default IndexPage

import React, { useState } from 'react';
import MovieTableContainer from '../components/MovieTable/MovieTable.container';
// import MovieTableContainer from '../containers/MovieTableContainer';
// import MovieDetailsContainer from '../containers/MovieDetailsContainer';
// import SortButtonContainer from '../containers/SortButtonContainer';
// import SearchBoxContainer from '../containers/SearchBoxContainer';

const HomePage: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  // const [sortType, setSortType] = useState<'episode' | 'release_date'>('episode');
  // const [searchTerm, setSearchTerm] = useState<string>('');

  const handleMovieSelect = (movie: any | null) => {
    setSelectedMovie(movie);
  };

  // const handleSortChange = (type: 'episode' | 'release_date') => {
  //   setSortType(type);
  // };

  // const handleSearchChange = (term: string) => {
  //   setSearchTerm(term);
  // };

  return (
    <div>
      <h1>Star Wars Saga Movies Table</h1>
      <MovieTableContainer onMovieSelect={handleMovieSelect} />
    </div>
  );
};

export default HomePage;
