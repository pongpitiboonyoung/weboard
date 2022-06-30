const Post = require('../../model/post/post');
const Like = require('../../model/post/like');
// NOTE add post
exports.post_add = async function (req, res, next) {
    try {
        let post_add = new Post({
            detail: req.body.detail,
            created_by: req.user._id,
        })
        await post_add.save()
        res.status(200).send({ status: true, msg: 'succes', data: post_add })
    } catch (e) {
        next(e)
    }
}
// NOTE edit post 
exports.post_edit = async function (req, res, next) {
    try {
        let update = await Post.updateOne(
            { _id: req.body._id },
            {
                $set: {
                    detail: req.body.detail
                }
            })
        if (update.modifiedCount == 0) {
            throw new Error('something wrong')
        }
        res.status(200).send({ status: true, msg: 'succes', data: update })
    } catch (e) {
        next(e)
    }
}
// NOTE delete post
exports.post_delete = async function (req, res, next) {
    try {
        let delete_post = await Post.deleteOne({ _id: req.body._id })
        if (delete_post.deletedCount == 0) {
            throw new Error('something wrong')
        }
        res.status(200).send({ status: true, msg: 'succes', data: delete_post })
    } catch (e) {
        next(e)
    }
}
// NOTE get post
exports.get_post = async function (req, res, next) {
    try {
        let post = await Post.get_post(req.user,req.body._id)
        res.status(200).send({ status: true, msg: 'succes', data: post })
    } catch (e) {
        next(e)
    }
}
// NOTE get post list
exports.get_post_list = async function (req, res, next) {
    try {
        let post_list = await Post.get_post_list(req.user)
        res.status(200).send({ status: true, msg: 'succes', data: post_list })
    } catch (e) {
        next(e)
    }
}