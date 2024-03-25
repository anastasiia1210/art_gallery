const {Painting, Genre} = require('../models/models');
const mongoose = require("mongoose");

async function getAllPaintings() {
    return Painting.find().populate('genre');
}

async function getPaintings() {
    return Painting.find().populate('genre');
}

async function getPaintingById(paintingId) {
    return Painting.findById(paintingId);
}

async function createPainting(paintingData) {
    try {
        const { title, year, description, artist, genre, url } = paintingData;
        if (!title || !description || !year || !artist || !genre || !url) {
            throw new Error("title, year, description, artist, genre must be not null");
        }
        const excitingGenre = await Genre.findById(genre);
        if (!excitingGenre) {
            console.error('Жанр з таким ID не знайдено');
            return;
        }
        const newPainting = await Painting.create({
            title,
            year,
            description,
            artist,
            url,
            genre: excitingGenre._id
        });
      return newPainting
    } catch (error) {
        throw error;
    }
}

async function updatePainting(paintingId, newData) {
    try {
        let painting = await Painting.findById(paintingId);

        if (!painting) {
            throw new Error("Painting not found");
        }

        painting.title = newData.title || painting.title;
        painting.year = newData.year || painting.year;
        painting.description = newData.description || painting.description;
        painting.artist = newData.artist || painting.artist;
        painting.url = newData.url || painting.url;

        if (newData.genre) {
            const existingGenre = await Genre.findById(newData.genre);
            if (!existingGenre) {
                throw new Error("Genre not found");
            }
            painting.genre = existingGenre._id;
        }

        const updatedPainting = await painting.save();
        return updatedPainting;
    } catch (error) {
        throw error;
    }
}

async function deletePainting(paintingId) {
    return Painting.findByIdAndDelete(paintingId);
}

async function countPaintings() {
    try {
        const count = await Painting.countDocuments();
        return count;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getPaintings,
    getAllPaintings,
    createPainting,
    getPaintingById,
    deletePainting,
    updatePainting,
    countPaintings
};
