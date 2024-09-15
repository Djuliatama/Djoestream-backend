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
        const user_id  = req.params.id;
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
        const commentId = req.params.id;
        const {text} = body.req;
        const updatedComment = await commentService.findByIdAndUpdate(commentId,{ text },{ new: true });
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