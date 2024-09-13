// require('dotenv').config();
const  {User} = require('../../models/user');
const index = require('../../models/index')
const { Op, where } = require('sequelize');
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid')
const jwt = require('jsonwebtoken');
const { ResponseError } = require('../error/response.error')
const { createUserSchema, loginUserSchema } = require('../joi/user.schema');
const userRepository = require('../repository/user.repository');
const { validate } = require('../joi/joi.validate');
const saltRounds = 10;

require('dotenv').config()


const userExist = async ({ username, email }) => {

    const user = await userRepository.findUserExist({ username, email });
    if (user) {
        throw new ResponseError(409, "Username already exist")
    }
}

// const existByEmail = async (email) => {
//     const user = await userRepository.findOneByEmail(email);
//     if (user) {
//         throw new ResponseError(409, "Email already exist")
//     }
// }

const register = async (request) => {
    // [1] Proses Validasi Payload dari Frontend
    const user = validate(createUserSchema, request);

    // [2] Proses Validasi user terdaftar di Database
    await userExist({ username: user.username, email: user.email });
    
    user.password = await bcrypt.hash(user.password, saltRounds);
    
    await userRepository.create(user);
}

const login = async (request) => {
    const loginRequest = validate(loginUserSchema, request);
    console.log(loginRequest);
    const user = await userRepository.findOneByUsername(loginRequest.username);
    
    if (!user) {
        throw new ResponseError(401, "Email or password is incorrect");
    }
    const passwordMatches = await bcrypt.compare(loginRequest.password, user.password);

    
    if (!passwordMatches) {
        throw new ResponseError(401, "Email or password is incorrect");
    }

    const token = jwt.sign({
        "id": user.id,
        "email": user.email,
        "username": user.username
    }, process.env.SECRET, { expiresIn: '24h' });

    return {
        token
    }
}


const get = async (user_id) => {
    const user = await userRepository.findOneById(user_id);
    if (!user) {
        throw new ResponseError(404, "User not found");
    }
    return user;
}

const logout = async (userId) => {
    const user = await userRepository.findOneById(userId);
    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    user.token = null;
    user.updated_at = Date.now();
    user.save();
}

module.exports = {
    register,
    login,
    logout,
    get,
    userExist
}