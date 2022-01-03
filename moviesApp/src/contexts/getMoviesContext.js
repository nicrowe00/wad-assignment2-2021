import React, { useState, createContext, useEffect, useReducer } from "react";
import { getMovies } from "../api/tmdb-api";
import { getUpcomingMovies } from "../api/tmdb-api";

export const MoviesContext2 = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "load":
      return { movies: action.payload.result};
    default:
      return state;
  }
};

const MoviesContextProvider2 = props => {
  const [state, dispatch] = useReducer(reducer, { movies: []});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getMovies().then(result => {
      console.log(result);
      dispatch({ type: "load", payload: {result}});
    });
    getUpcomingMovies().then(result => {
      console.log(result);
      dispatch({ type: "load", payload: {result}});
    })
  },[]);

  return (
    <MoviesContext2.Provider
      value={{
        movies: state.movies,
        setAuthenticated
      }}
    >
      {props.children}
    </MoviesContext2.Provider>
  );
};

export default MoviesContextProvider2