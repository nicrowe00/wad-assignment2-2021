export const getMovies = () => {
  return fetch(
    'api/movies/tmdb/movies', {headers: {
      'Authorization': window.localStorage.getItem('token')
    }}
  ).then(res => res.json());
};
  
export const getMovie = (args) => {
  // console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};
  
  export const getGenres = async () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieReviews = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        return response.json();
      })
      .catch((error) => {
         throw error
      });
    };


  export const getUpcomingMovies = () => {
      return fetch(
        "api/movies/tmdb/upcoming", {headers: {
          "Authorization": window.localStorage.getItem('token')
        }}
      ).then(res => res.json())
    };
      

  export const getTopRatedMovies = () => {
    return fetch(
      'api/movies/tmdb/toprated', {headers: {
        'Authorization': window.localStorage.getItem('token')
      }}
    ).then(res => res.json());
  };

  export const getCurrentMovies = () => {
    return fetch(
      'api/movies/tmdb/nowplaying', {headers: {
        'Authorization': window.localStorage.getItem('token')
      }}
    ).then(res => res.json());
  };

    export const getPopularMovies = () => {
      return fetch(
        'api/movies/tmdb/popular', {headers: {
          'Authorization': window.localStorage.getItem('token')
        }}
      ).then(res => res.json());
    };