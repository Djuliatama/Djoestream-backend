// const multer = require('multer');
const videoController = require('../controller/video.controller.js');
const videoRouter = require('express').Router();
const  {videoUpload} = require('../multer.config.js')

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

videoRouter.post('/upload', videoUpload.single('video'), videoController.uploadVideo)
videoRouter.get('/videos/:filename', videoController.getVideo); //route for streaming video
videoRouter.get('/videos/:id', videoController.getVideoById); 
videoRouter.delete('/videos/:id', videoController.delete);

module.exports = {
    videoRouter
}