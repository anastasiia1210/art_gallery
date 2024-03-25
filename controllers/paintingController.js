const paintingService = require('../services/PaintingService');
const {compareSync} = require("bcrypt");

async function getPaintings(req, res) {
    try {
        const paintings = await paintingService.getPaintings(); 
        const totalCount = await paintingService.countPaintings();
        res.header('Content-Range', `paintings 0-${paintings.length - 1}/${totalCount}`);
        res.json(paintings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getPaintingById(req, res) {
    try {
        const painting = await paintingService.getPaintingById(req.params.id);
        if (!painting) {
            return res.status(404).json({ message: 'painting not found' });
        }
        res.json(painting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createPainting(req, res) {
    try {
        const painting = await paintingService.createPainting(req.body);
        res.status(201).json(painting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updatePainting(req, res) {
    const paintingId = req.params.id;
    const newData = req.body;
    try {
        const updatedPainting = await paintingService.updatePainting(paintingId, newData);
        res.json(updatedPainting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deletePainting(req, res) {
    try {
        const deletedpainting = await paintingService.deletePainting(req.params.id);
        res.json(deletedpainting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getPaintings,
    getPaintingById,
    createPainting,
    deletePainting,
    updatePainting
};
