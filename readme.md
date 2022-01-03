# Assignment 2 - Web API.

Name: Niall Crowe

## Features.

 
 + Feature 1 - Added login and signup pages
 + Feature 2 - Added user authentication
 + Feature 3 - Added API Routes for TMDB
 + Feature 4 - Integrated React App features to work with the API.
 + etc

## Installation Requirements
git clone https://github.com/ncrowe2000/wad-assignment2-2021.git
cd moviesApp
npm install
cd..
cd movies-api
npm install

```

## API Configuration

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
mongoDB=mongodb://localhost:27017/movies_db
seedDb=true
secret=ilikecake
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies/tmdb/movies |Gets a list of movies | N/A | N/A |
| /api/movies/tmdb/upcoming | Get a list of upcoming movies| N/A | N/A | N/A
| /api/movies/tmdb/toprated | Get a list of the highest rated movies| N/A | N/A
| /api/movies/tmdb/nowplaying | Get a list of movies playing now in theatres| N/A | N/A
| /api/movies/tmdb/popular | Get a list of movies that are currently popular| N/A | N/A


## Security and Authentication
JWT Tokens are used to authenticate users

## Integrating with React App


~~~Javascript
export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  )
    .then(res => res.json())
    .then(json => {return json.results;});
};

export const getTopRatedMovies = () => {
  return fetch(
    '/api/movies/tmdb/toprated',{headers: {
      'Authorization': window.localStorage.getItem('token')
    }}
  )
}

~~~

