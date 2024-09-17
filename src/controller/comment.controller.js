const commentService = require('../service/comment.service');

const createComment = async (req, res, next) => {
    try {
        const request = req.body;
        console.log(request);
        const commentResponse = await commentService.create(request);
        res.status(201).json(commentResponse);
    } catch (error) {
        next(error);
    }
}

const list = async (req, res, next) => {
    try  {
        const user_id = req.params;
        const commentResponse = await commentService.list(user_id)
        res.status(200).json({
            data: commentResponse
        })
    } catch (error) {
        next(error);
    }
}

const removeCommentById = async (req, res, next) => {
    try {
        const comment_id = req.params.id;
        console.log(comment_id)
        const deleteResponse = await commentService.remove(comment_id);
        res.status(200).json(deleteResponse);
        console.log('return', deleteResponse);
    } catch (error) {
        next(error);
    }
}

const updateComment = async (req, res, next) => {
    try {
        const comment_id = req.params.id;
        const request = req.body;
        console.log('ini request' , request);
        const updatedComment = await commentService.update(comment_id, request);
        res.status(200).json(updatedComment);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createComment,
    list,
    removeCommentById,
    updateComment
}