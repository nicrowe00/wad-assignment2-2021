import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import { Profile } from "./components/pages";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from './pages/upcomingMoviesPage';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import watchListMoviesPage from "./pages/watchListMovies";
import TopRatedMoviesPage from "./pages/topRatedMovies";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import PrivateRoute from "./api/privateRoute";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import AuthProvider from "./contexts/authContext"
import AuthHeader from "./contexts/authHeader"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthProvider>
        <SiteHeader />
        <AuthHeader />
        <MoviesContextProvider>
      
            {" "}
        <Switch>
        <Route exact path="/upcoming" component={UpcomingMoviesPage} />
        <Route exact path="/nowplaying" component={NowPlayingMoviesPage} />
        <Route exact path="/toprated" component={TopRatedMoviesPage} />
        <Route exact path="/popular" component={PopularMoviesPage} />
        <Route exact path="/reviews/form" component={AddMovieReviewPage} />
          <Route path="/reviews/:id" component={MovieReviewPage} />
          <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
          <Route exact path="/movies/watchlist" component={watchListMoviesPage} />
          <Route path="/movies/:id" component={MoviePage} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/" component={HomePage} />
          <Redirect from="*" to="/" />
        </Switch>
        </MoviesContextProvider>
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    );
  };

ReactDOM.render(<App />, document.getElementById("root"));