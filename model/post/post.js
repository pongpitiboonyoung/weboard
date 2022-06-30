const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const schema = new mongoose.Schema({
    detail: {
        type: String,
        required: true,
        trim: true
    },
    created_by: {
        type: Number,
        required: true,
        ref: "User"
    },
    deleted: {
        type: Boolean,
        default: null,
    },
}, {
    collection: 'Post',
    timestamps: { createdAt: 'created_at', updatedAt: 'update_at' }
});

schema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'post_id',
    count: true
});

schema.plugin(autoIncrement.plugin, {
    model: 'Post',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

schema.statics.get_post_list = async function(user){
    let post_list = await mongoose.model('Post').find().sort({ created_at: -1 }).populate('created_by likes').lean()
    let new_array = await Promise.all(post_list.map(async function(x) {
        let status = await mongoose.model('Like').findOne({ like_by: user ? user : null, post_id: x._id })
        x['status_like'] = status ? true : false
        return x
    }));
    return new_array
}

schema.statics.get_post = async function(user,post_id){
    let post = await mongoose.model('Post').findOne({ _id: post_id }).populate('created_by likes').lean()
    if (!post) {
        throw new Error('post not found')
    }
    let status = await mongoose.model('Like').findOne({ like_by: user ? user : null, post_id: post_id })
    post.status_like = status ? true : false
    return post
}

const Post = mongoose.model('Post', schema);

module.exports = Post;