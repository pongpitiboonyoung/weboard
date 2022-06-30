const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const autoIncrement = require('mongoose-auto-increment');
const Post = require('../../model/post/post');
const User = require('../../model/user/user');
autoIncrement.initialize(mongoose.connection);

const schema = new mongoose.Schema({
    post_id: {
        type: Number,
        required: true,
        ref: "Post"
    },
    like_by: {
        type: Number,
        required: true,
        ref: "User"
    },
}, {
    collection: 'Like',
    timestamps: { createdAt: 'created_at', updatedAt: 'update_at' }
});

schema.plugin(autoIncrement.plugin, {
    model: 'Like',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

schema.statics.like_post = async function (user, post_id) {
    let find_like = await Like.findOne({ post_id: post_id, like_by: user._id, })
    let like_add = !find_like ? await new Like({ post_id: post_id, like_by: user._id, }).save()
        : await Like.deleteOne({ post_id: post_id, like_by: user._id })
    return { status: true, msg: !find_like ? 'like' : 'don\'t like', data: like_add }
}

schema.pre('save', async function () {
    // You can also throw a synchronous error
    if (this.post_id) {
        let find_post = await Post.findById(this.post_id)
        if (!find_post) {
            throw new Error('post not found');
        }
    }
    if (this.like_by) {
        let find_user = await User.findById(this.like_by)
        if (!find_user) {
            throw new Error('user not found');
        }
    }
});


const Like = mongoose.model('Like', schema);

module.exports = Like;