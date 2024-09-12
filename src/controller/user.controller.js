const userService = require('../service/user.service');

const register = async (req, res, next) => {
    try {
        const request = req.body;

        const userResponse = await userService.register(request);
        res.status(200).json(userResponse);
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const request = req.body;

        const userResponse = await userService.login(request);
        res.status(200).json(userResponse);
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        
        await userService.logout(userId);
        res.status(200).json({ message: 'Logout successful'});
    } catch (error) {
        next(error);
    }
}


const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers()
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const userResponse = await userService.get(user_id);
        res.status(200).json(userResponse);
    } catch (error) {
        next(error);
    }
}

const deletedUserById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const deleteResponse = await userService.delete(userId);
        res.status(200).json(deleteResponse);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    register,
    login,
    logout,
    getUsers,
    getUserById,
    deletedUserById
}