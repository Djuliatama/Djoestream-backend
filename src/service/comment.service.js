const commentRepository = require('../repository/comment.repository');
const index = require('../../models/index')
const {Comment} = require('../../models/comment');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {ResponseError} = require('../error/response.error')
const { createCommentSchema, updateCommentSchema, getCommentValidation } = require('../joi/comment.schema');
const {validate} = require('../joi/joi.validate');
const { CommentResponse } = require('../response/comment.response');


const mapToCommentResponse = (commentData) => {
    return new CommentResponse (
        this.comment_id = comment_id,
        this.video_id = video_id,
        this.user_id = user_id,
        this.content = content,
    )
}

// const userExist = async ({ username, email }) => {

//     const user = await userRepository.findUserExist({ username, email });
//     if (user) {
//         throw new ResponseError(409, "Username already exist")
//     }
// }

const commentExist = async ({ username, content}) => {
    const comment = await commentRepository.findCommentExist({ username, content});
    if (comment) {
        throw new ResponseError(409, 'Comment already exist')
    }
}

const create = async (request) => {
    const comment = validate(createCommentSchema, request);
    console.log(comment)
    // await findCommentExist(comment.id);
    await commentExist({ username: comment.username, content: comment.content});
    // comment.id = uuidv4();
    // await userExist({ username: user.username, email: user.email });
    await commentRepository.create(comment);
    // await commentRepository.create(comment);
    // const createdComment = await commentRepository.create(comment);
    // return await commentRepository.findOneInactiveById(createdComment.id)
};


const update = async (commentId, updateData) => {
    const validatedUpdatedComment = validate(updateCommentSchema, updateData);

    const comment = await commentRepository.findById(commentId);
    
    if(!comment) {
        throw new ResponseError('Comment not found');
    }
    await commentRepository.updateCommentById(comment, validatedUpdatedComment);
    comment.update_at = Date.now();
    await comment.save();
    return comment;
};

const remove = async (userId, commentId) => {
    commentId = validate(getCommentValidation, commentId);
    commentId = await checkCommentMustExist(userId,commentId);

    const comment = await get(userId,commentId);

    if (!comment) {
        throw new ResponseError('Comment not found');
    }
    await comment.remove();
    return { success: true };
}

const list = async (user_id) => {
    const commentData = await commentRepository.findAllWitCommentByUserId(user_id);
     return commentData.map( commentData => mapToCommentResponse(commentData));
}

module.exports = {
    create,
    update,
    remove,
    list,
};