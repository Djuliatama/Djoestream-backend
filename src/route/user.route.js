const userController = require('../controller/user.controller.js');
const userRouter = require('express').Router();
const {verifyToken} = require('../middleware/auth.middleware.js');


userRouter.post('/', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/:id', userController.getUserById);
userRouter.delete('/users/:id', userController.deletedUserById);

module.exports = {
    userRouter
}
