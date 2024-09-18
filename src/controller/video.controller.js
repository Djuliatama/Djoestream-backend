const videoService = require ('../service/video.service');
// const storage = multer.memoryStorage();
// const multer = require('multer');

const uploadVideo = async (req,res, next) => {
    try {
        const request = {
            title: req.body.title,
            filename: req.file.filename
        }

        const video = await videoService.saveVideo(request);
        res.status(200).json(video)
    } catch (error) {
        next(error);
    }

} 

module.exports =  {
    uploadVideo
}


