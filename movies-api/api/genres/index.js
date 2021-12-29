import express from 'express';
import Genre from './moviesGenres';

const router = express.Router(); 

router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres);
});


export default router;