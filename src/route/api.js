const {userRouter} = require('./user.route');
const {commentRouter} = require('./comment.route');
const {videoRouter} = require('./video.route')
const bodyParser = require('body-parser')

const express = require("express");
// const { videoRouter } = require('./video.route');
const router = express.Router();

// const app = express();

router.use(
    bodyParser.urlencoded({
        extended: true,
    })
  );
  
router.use(bodyParser.json());

// user
router.use('/api/v1/users', userRouter);

// address
router.use('/api/v1/comments', commentRouter);

//video 
router.use('/api/v1/videos', videoRouter);


module.exports = {
    router
};