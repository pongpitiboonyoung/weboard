const Like = require('../../model/post/like');
// NOTE add post
exports.like_add = async function (req, res, next) {
    try {
        let like_post = await Like.like_post(req.user,req.body.post_id)
        res.status(200).send(like_post)
    } catch (e) {
        next(e)
    }
}