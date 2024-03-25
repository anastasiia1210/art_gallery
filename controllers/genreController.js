const GenreService = require('../services/GenreService');
const genreService = new GenreService();

async function createGenre(req, res) {
    try {
        const { name } = req.body;
        const genre = await genreService.createGenre(name);
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getGenres(req, res) {
    try {
        const genres = await genreService.getGenres();
        const totalCount = await genreService.countGenres();
        res.header('Content-Range', `genres 0-${genres.length - 1}/${totalCount}`);
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getGenreById(req, res) {
    try {
        const genre = await genreService.getGenreById(req.params.id);
        res.json(genre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateGenre(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedGenre = await genreService.updateGenre(id, name);
        res.json(updatedGenre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteGenre(req, res) {
    try {
        const deletedGenre = await genreService.deleteGenre(req.params.id);
        res.json(deletedGenre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createGenre,
    getGenres,
    getGenreById,
    updateGenre,
    deleteGenre
};
