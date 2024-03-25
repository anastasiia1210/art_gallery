const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function signUp(login, password) {
    try {
        const existingUser = await User.findOne({ login });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ login, password: hashedPassword });
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
}

async function login(login, password) {
    try {
        const user = await User.findOne({ login });
        if (!user) {
            throw new Error('Invalid login credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid login credentials');
        }

        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

        return token;
    } catch (error) {
        throw error;
    }
}

async function getUsers() {
    return User.find();
}

async function deleteUser(userId) {
    return User.findByIdAndDelete(userId);
}

async function countUsers() {
    try {
        const count = await User.countDocuments();
        return count;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    signUp,
    login,
    getUsers,
    countUsers,
    deleteUser
};
