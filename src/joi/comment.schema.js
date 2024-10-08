const Joi = require('joi');

const createCommentSchema = Joi.object({
    username: Joi.string().min(2).max(100).required(),
    content: Joi.string().min(1).max(1000).required(),
    // content: Joi.string().min(1).max(1000).required(), 
    // createdAt: Joi.date().iso().default(() => new Date(), 'current date and time'), 
  })


const updateCommentSchema = Joi.object({
    content: Joi.string().min(1).max(1000), 
    // updatedAt: Joi.date().iso().default(() => new Date(), 'current date and time'),
});

const getCommentValidation = Joi.string().required();



module.exports = {
    createCommentSchema,
    updateCommentSchema,
    getCommentValidation
}

