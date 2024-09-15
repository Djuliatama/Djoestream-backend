const {Comment, User} = require('../../models');
const { Op } = require('sequelize');
const { comment_id } = require('../service/comment.service');


const findCommentExist = async ({content}) => {
    return await Comment.findOne({
        where: {
            [Op.or]: [
                { content },
            ]
        },
        attributes: ['user_id'],
        logging: console.log
    })
}

const commentIdExist = async ({comment_id}) => {
    return await Comment.findOne({
        where: {
            [Op.or]: [
                {comment_id}
            ]
        },
        attributes: ['comment_id'],
    })
}


const create = async (comment) => {
    return await Comment.create(comment);
}


const findOneById = async (comment_id) => {
    return await Comment.findOne({
        where: {comment_id:comment_id},
        attributes: [ 'comment_id', 'video_id', 'user_id', 'username', 'content'],
    })

}

const findOneByUserId = async (userId, commentId) =>{
    return await Comment.findOne({
        where: {
            userId: userId,
            id: commentId
        },
        attributes: [ 'userId', 'content', 'createdAt', 'updatedAt'],
        include: [{
            model: User,
            attributes: ['username', 'email'] 
        }]
    });
}



const updateCommentByCommentId = async (commentId, newContent) => {
    const comment = await Comment.findOne({
        where: {id: commentId},
    });

    comment.content = newContent;
    await comment.save();
    return comment;
}

const deleteCommentById = async (comment_id) => {
    const comment = await Comment.findOne({
        where: { comment_id: comment_id },
        attributes: [ 'comment_id', 'video_id', 'user_id', 'username', 'content']
    });
    console.log(comment);
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
    commentIdExist,
    findOneById,
    findOneByUserId,
    create,
    updateCommentByCommentId,
    deleteCommentById,
    findAllWithCommentByUserId
}
