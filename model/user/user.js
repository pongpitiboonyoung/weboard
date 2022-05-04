const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        minlength: 3
    },
    role: {
        type: String,
        default: 'member'
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

const user = mongoose.model('User', schema);

module.exports = user;
// NOTE setting first admin 
setTimeout(async () => {
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
}, 1000);