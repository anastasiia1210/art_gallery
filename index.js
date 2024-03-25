const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 5000

const app = express();
const mongoString = process.env.DATABASE_URL

app.use(express.json());

app.use(cors());
app.use(cors({
    exposedHeaders: ['Content-Range'], 
}));

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

