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
    post_id: {
        type: Number,
        required: true,
        ref: "Post"
    },
    deleted: {
        type: Boolean,
        default: null,
    },
}, {
    collection: 'Comment',
    timestamps: { createdAt: 'created_at', updatedAt: 'update_at' }
});

schema.plugin(autoIncrement.plugin, {
    model: 'Comment',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});


const Comment = mongoose.model('Comment', schema);

module.exports = Comment;