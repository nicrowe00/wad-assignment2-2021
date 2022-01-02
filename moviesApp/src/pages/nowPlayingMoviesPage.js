import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getCurrentMovies} from '../api/tmdb-api'
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'

const NowPlayingMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('now playing', getCurrentMovies)

  if (isLoading) {
    return <Spinner />
  }

  ;if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results

  // Redundant, but necessary to avoid app crashing.
  const watchlists = movies.filter(m => m.watchlists)
  localStorage.setItem('watchlists', JSON.stringify(watchlists))
  const addToWatchLists = (movieId) => true  

  return (
    <PageTemplate
      title="Movies Playing Now"
      movies={movies}
      action={(movie) => {
        return <AddToWatchListIcon movie={movie} />
      }}
    />
);
};

export default NowPlayingMoviesPage;