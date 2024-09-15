const { User } = require('../../models');
const { Op } = require('sequelize');
// const { removeCommentById } = require('../controller/comment.controller');

const findOneById = async (user_id) => {
    return await User.findOne({
        where: { user_id: user_id },
        attributes: ['user_id', 'email', 'username', 'password']
    });
}

const findOneByUsername = async (username) => {
    const user = await User.findOne({
        where: { username: username },
        attributes: ['user_id', 'email', 'username', 'password']
    })

    return user ? user.dataValues : null
}

const findUserExist = async ({ username, email }) => {
    return await User.findOne({
        where: {
            [Op.or]: [
                { email },
                { username }
            ]
        },
        attributes: ['user_id'],
        logging: console.log
    })
}

const create = async (user) => {
    return await User.create(user);
}


module.exports = {
    findOneById,
    findOneByUsername,
    findUserExist,
    create,
}