const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, { toJSON: { virtuals: true }, id: true });

const paintingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { toJSON: { virtuals: true }, id: true });

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { toJSON: { virtuals: true }, id: true });

const User = mongoose.model('User', userSchema);
const Genre = mongoose.model('Genre', genreSchema);
const Painting = mongoose.model('Painting', paintingSchema);

module.exports = {
    Genre,
    Painting,
    User
};
