const videoRepository = require('../repository/video.repository')


const videoExistById = async({video_id}) => {
    const video = await videoRepository.videoIdExist({video_id});
    if (video) {
        throw new ResponseError(409, 'Comment already exist')
    }
}

const saveVideo = async (videoData) => {
    await videoExistById({video_id: video.video_id});
    const video = await videoRepository.create(videoData);
    return video;
}


module.exports = {
    saveVideo
}