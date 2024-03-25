const userService = require('../services/UserService');

async function signUp(req, res) {
    try {
        const { login, password } = req.body;
        const user = await userService.signUp(login, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function login(req, res) {
    try {
        const { login, password } = req.body;
        const token = await userService.login(login, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

async function getUsers(req, res) {
    try {
        const users = await userService.getUsers(); 
        const totalCount = await userService.countUsers();
        res.header('Content-Range', `users 0-${users.length - 1}/${totalCount}`);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const deleted = await userService.deleteUser(req.params.id);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    signUp,
    login,
    getUsers,
    deleteUser
};
