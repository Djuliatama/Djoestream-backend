const videoRepository = require('../repository/video.repository')

const saveVideo = async (videoData) => {
    const video = await videoRepository.create(videoData);
    return video;
}


module.exports = {
    saveVideo
}