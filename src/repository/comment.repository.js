const {Comment, User} = require('../../models');
const { Op } = require('sequelize');


const findCommentExist = async ({ username, content}) => {
    return await Comment.findOne({
        where: {
            [Op.or]: [
                { username },
                { content }
            ]
        },
        attributes: ['user_id'],
        logging: console.log
    })
}

const create = async (comment) => {
    return await Comment.create(comment);
}


const findOneById = async (commentId) => {
    return await Comment.findOne({
        where: {id: commentId}
    })

}

const findOneByUserId = async (userId, commentId) =>{
    return await User.findOne({
        where: {
            userId: userId,
            id: commentId
        },
        attributes: ['id', 'userId', 'content', 'createdAt', 'updatedAt'],
        include: [{
            model: User,
            attributes: ['username', 'email'] 
        }]
    });
}



const updateCommentByCommentId = async (commentId, newContent) => {
    const comment = await Comment.findOne({
        where: {id: commentId}
    });

    comment.content = newContent;
    await comment.save();
    return comment;
}

const deleteCommentById = async (commentId) => {
    const comment = await Comment.findOne({
        where: { id: commentId }
    });
    await comment.destroy();
    return true
}

const findAllWithCommentByUserId = async (user_id) => {
    return await Comment.findAll({
        where: {
            user_id : user_id
        },
        attributes: ['comment_id', 'video_id', 'content'],
    })
}

module.exports = {
    findCommentExist,
    findOneById,
    findOneByUserId,
    create,
    updateCommentByCommentId,
    deleteCommentById,
    findAllWithCommentByUserId
}
