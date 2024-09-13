class CommentResponse {
    constructor(comment_id, video_id, user_id, content, createdAt, updatedAt) {
        this.comment_id = comment_id;
        this.video_id = video_id;
        this.user_id = user_id;
        this.content = content;
    }
}

module.exports = {
    CommentResponse
}