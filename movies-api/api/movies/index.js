import express from 'express';
import { movieReviews} from './moviesData';
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import uniqid from 'uniqid';
import { getMovies,  getTopRatedMovies,  getUpcomingMovies, getCurrentMovies, getPopularMovies} from '../tmdb-api';

const router = express.Router(); 

router.get("/tmdb/upcoming", asyncHandler( async(req, res) => {

    const upcomingmovies = await getUpcomingMovies();
    res.status(200).json(upcomingmovies);
    
}));
  
  router.get('/tmdb/toprated', asyncHandler( async(req, res) => {
    const topratedmovies = await getTopRatedMovies();
    res.status(200).json(topratedmovies);
  }));

  router.get('/tmdb/movies', asyncHandler( async(req, res) => {
      const movies1 = await getMovies();
      res.status(200).json(movies1);
  }));

  router.get('/tmdb/nowplaying', asyncHandler( async(req, res) => {
      const nowplayingmovies = await getCurrentMovies();
      res.status(200).json(nowplayingmovies);
  }));

  router.get('/tmdb/popular', asyncHandler( async (req, res) => {
      const popularmovies = await getPopularMovies();
      res.status(200).json(popularmovies);
  }));

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    const moviesPromise = movieModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const movies = await moviesPromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: movies };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get movie reviews
router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (movieReviews.id == id) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);

    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        movieReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

export default router;