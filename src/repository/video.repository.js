const {Video} = require('../../models/video');
const {Op} = require('sequelize');

const videoIdExist = async ({video_id}) => {
    return await Video.findOne({
        where: {
            [Op.or]: [
                {video_id}
            ]
        },
        attributes: ['video_id'],
    })
}

const create = async (video) => {
    return await Video.create(video);
}


module.exports = {
    videoIdExist,
    create
}