const {Comment, User} = require('../../models');
const { Op } = require('sequelize');
// const commentService = require('../service/comment.service');
// const { comment_id } = require('../service/comment.service');


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

const deleteCommentById = async (comment_id) => {
    const comment = await Comment.findOne({
        where: { comment_id: comment_id },
        attributes: [ 'comment_id', 'video_id', 'user_id', 'username', 'content']
    });
    console.log(comment);
    await comment.destroy();
    return true
}

const getCommentByUsername = async (username) => {
    const user = await User.findOne({ 
        where: {username}
    });
    const comments = await Comment.findAll({
        where: {user_id: username_id}
    });
    return comments;
}


const findCommentById = async (comment_id) => {
    return await Comment.findOne({
        where: {comment_id:comment_id},
        attributes: [ 'comment_id', 'video_id', 'user_id', 'username', 'content'],
    })

}

const findOneByUserId = async (user_id, commentId) =>{
    return await Comment.findOne({
        where: {
            user_id: user_id,
            comment_id: comment_id
        },
        attributes: [ 'user_id', 'content', 'createdAt', 'updatedAt'],
        include: [{
            model: User,
            attributes: ['username', 'email'] 
        }]
    });
}



const updateCommentByCommentId = async (comment_id, newContent) => {
    const comment = await Comment.findOne({
        where: {comment_id: comment_id},
    });

    comment.content = newContent;
    await comment.save();
    return comment;
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
    create, 
    deleteCommentById,
    getCommentByUsername,
    findCommentById,
    findOneByUserId,
    updateCommentByCommentId,
    findAllWithCommentByUserId
}
