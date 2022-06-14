const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const schema = new mongoose.Schema({
    post : {
        type: String,
        required: true,
        trim: true
    },
    created_by : {
        type: Number,
        required: true,
        ref : "User"
    },
    deleted: {
        type: Boolean,
        default: null,
    },
}, {
    collection: 'Post',
    timestamps: { createdAt: 'created_at', updatedAt: 'update_at' }
});

schema.plugin(autoIncrement.plugin, {
    model: 'Post',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const Post = mongoose.model('Post', schema);

module.exports = Post;