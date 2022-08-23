const Comment = require('../../model/post/comment');
// NOTE add post
exports.comment_add = async function (req, res, next) {
    try {
        let comment_add = new Comment({})
        await comment_add.save()
        res.status(200).send(comment_add)
    } catch (e) {
        next(e)
    }
}

exports.comment_edit = async function (req, res, next) {
    try {
        let comment_add = await Comment.deleteOne({_id : 'x'})
        if (comment_add.deletedCount == 0) {
            throw new Error('something wrong')
        }
        res.status(200).send({ status: true, msg: 'succes', data: delete_post })
    } catch (e) {
        next(e)
    }
}