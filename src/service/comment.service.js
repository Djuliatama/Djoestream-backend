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
    await commentRepository.deleteCommentById(comment_id);
    console.log(comment_id)

    if (!comment) {
        throw new ResponseError('Comment not found');
    }
    
    await comment.remove();
    return { success: true };
}

const update = async (comment_id, request) => {
    const comment = validate(updateCommentSchema, request);
    comment_id = validate(getCommentValidation, comment_id);

    const updateComment = await commentRepository.findCommentById(comment_id);

    if (!updateComment) {
        throw new ResponseError('Comment not found');
    }

    updateComment.content = comment.content;
    comment.update_at = Date.now();
    await updateComment.save()
    return updateComment
  
};

const list = async (username) => {
    const commentData = await commentRepository.getCommentByUsername(username);
     return commentData.map( commentData => mapToCommentResponse(commentData));
}

module.exports = {
    create,
    commentExistbyId,
    update,
    remove,
    list,
};