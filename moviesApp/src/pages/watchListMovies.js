import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromWatchLists from "../components/cardIcons/removeFromWatchLists";


const WatchListMoviesPage = () => {
  const {watchLists: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const WatchListsMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = WatchListsMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = WatchListsMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });


  return (
    <PageTemplate
      title="Movie Watch List"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchLists movie={movie} />
          </>
        );
      }}
    />
  );
};


export default WatchListMoviesPage;