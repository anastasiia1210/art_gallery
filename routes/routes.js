const express = require('express');
const router = express.Router();
const posterRoutes = require('./paintingRoutes');
const genreRoutes = require('./genreRoutes');
const userRoutes = require('./userRoutes')

router.use('/paintings', posterRoutes);
router.use('/genres', genreRoutes);
router.use('/admin', userRoutes)
module.exports = router;
