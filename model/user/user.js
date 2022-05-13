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
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    deleted: {
        type: Boolean,
        default: null,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    role: {
        type: String,
        default: 'member'
    },
    token: {
        type: String,
        default: "no_token"
    }
}, {
    collection: 'member',
    timestamps: { createdAt: 'created_at', updatedAt: 'update_at' }
});

// NOTE hash password
schema.statics.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}
// NOTE check password
schema.statics.checkPassword = async function (password, hash) {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
}

schema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

const user = mongoose.model('User', schema);

module.exports = user;

//NOTE default admin
let created_admin = async () => {
    try {
        let find = await user.find({ role: "admin" })
        if ( find.length > 0 ) {
            throw new Error('####### admin created #######')
        }
        let admin = new user({
            name: 'admin',
            email: 'not found',
            password: await user.encryptPassword("123456789"),
            role: "admin"
        })
        await admin.save()
        console.log('####### admin ########',admin)
    } catch (e) {
        console.log(e.message)
    }
};
created_admin()