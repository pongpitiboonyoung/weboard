const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const schema = new mongoose.Schema({
    img: {
        filename : {
            type : String,
            default: null
        }
    },
    post : {
        type: String,
        required: true,
        trim: true
    },
    deleted: {
        type: Boolean,
        default: null,
    },
}, {
    collection: 'webboard',
    timestamps: { createdAt: 'created_at', updatedAt: 'update_at' }
});

schema.plugin(autoIncrement.plugin, {
    model: 'Webboard',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const webboard = mongoose.model('Webboard', schema);

module.exports = webboard;