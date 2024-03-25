const {Genre} = require('../models/models');

class GenreService {
    async createGenre(name) {
        try {
            const genre = await Genre.create({ name });
            return genre;
        } catch (error) {
            throw error;
        }
    }

    async getGenres() {
        try {
            const genres = await Genre.find();
            return genres;
        } catch (error) {
            throw error;
        }
    }

    async getGenreById(id) {
        try {
            const genre = await Genre.findById(id);
            return genre;
        } catch (error) {
            throw error;
        }
    }

    async updateGenre(id, newName) {
        try {
            const genre = await Genre.findByIdAndUpdate(id, { name: newName }, { new: true });
            return genre;
        } catch (error) {
            throw error;
        }
    }

    async deleteGenre(id) {
        try {
            const deletedGenre = await Genre.findByIdAndDelete(id);
            return deletedGenre;
        } catch (error) {
            throw error;
        }
    }

    async countGenres() {
        try {
            const count = await Genre.countDocuments();
            return count;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GenreService;
