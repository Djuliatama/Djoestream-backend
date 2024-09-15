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

const commentExist = async ({content}) => {
    const comment = await commentRepository.findCommentExist({content});
    if (comment) {
        throw new ResponseError(409, 'Comment already exist')
    }
}

const create = async (request) => {
    const comment = validate(createCommentSchema, request);
    console.log(comment)
    await commentExist({content: comment.content});
    await commentRepository.create(comment);
};

const commentExistbyId = async({comment_id}) => {
    const comment = await commentRepository.commentIdExist({comment_id});
    if (comment) {
        throw new ResponseError(409, 'Comment already exist')
    }
}

const remove = async (comment_id) => {
    comment_id = validate(getCommentValidation, comment_id);
    console.log(comment_id)
    comment = 
    // comment_id = await commentExistbyId(comment_id);
    console.log(comment_id)
    // const comment = await get(comment_id);
    console.log('ini comment', comment_id)
    await commentRepository.deleteCommentById(comment_id);
    console.log(comment_id)

    if (!comment) {
        throw new ResponseError('Comment not found');
    }
    
    await comment.remove();
    return { success: true };
}

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

const list = async (user_id) => {
    const commentData = await commentRepository.findAllWitCommentByUserId(user_id);
     return commentData.map( commentData => mapToCommentResponse(commentData));
}

module.exports = {
    create,
    commentExistbyId,
    update,
    remove,
    list,
};