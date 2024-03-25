const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);
router.get('/', UserController.getUsers);
router.post('/', UserController.signUp);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
