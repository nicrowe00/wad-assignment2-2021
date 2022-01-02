import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [watchLists, setWatchLists] = useState( [] )

 

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    setFavorites(newFavorites)
  };

  const addToWatchList = (movie) => {
      let newWatchList = [];
      if (!watchLists.includes(movie.id)){
          newWatchList = [...watchLists, movie.id];
      }
      setWatchLists(newWatchList);
  }

  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const removeFromWatchLists = (movie) => {
      setWatchLists( watchLists.filter(
          (mId) => mId !== movie.id
      ))
  }

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        addToWatchList,
        watchLists,
        removeFromFavorites,
        removeFromWatchLists,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;