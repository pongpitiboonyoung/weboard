const User = require('../../model/user/user')
const mongoose = require('mongoose')
const { find } = require('../../model/user/user')
const fs = require('fs')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

// NOTE upload
exports.upload = upload.single('file')

// NOTE auth
exports.auth = async function (req, res, next) {
    try {
        if (!req.session.member) {
            throw new Error('Please login')
        }
        next()
    } catch (e) {
        console.log(e)
        next(e)
    }
}
// NOTE register
exports.register = async function (req, res, next) {
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await User.encryptPassword(req.body.password)
        })
        await user.save()
        res.send({ status: true, msg: 'succes', data: user })
    } catch (e) {
        console.log(e)
        next(e)
    }
}
// NOTE login
exports.login = async function (req, res, next) {
    try {
        let find_user = await User.findOne({ email: req.body.email })
        let check = await User.checkPassword(req.body.password, find_user.password)
        if (!check) {
            throw new Error("not found ")
        }
        req.session.member = find_user
        res.send({ status: true, msg: 'succes', data: null })
    } catch (e) {
        console.log(e)
        next(e)
    }
}
// NOTE edit profile
exports.edit_profile = async function (req, res, next) {
    try {
        let find = await User.findById(req.session.member._id)
        let update = await User.updateOne(
            { _id: req.session.member._id },
            {
                $set: {
                    img: req.file ? req.file : null,
                    name: req.body.name,
                    email: req.body.email,
                    password: await User.encryptPassword(req.body.password)
                }
            })
        fs.unlink(`./public/uploads/${find.img.filename}`, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('deleted');
        })
        res.send({ status: true, msg: 'succes', data: update })
    } catch (e) {
        console.log(e)
        next(e)
    }
}
// NOTE logout
exports.logout = async function (req, res, next) {
    try {
        delete req.session.member
        res.send({ status: true, msg: 'succes' })
    } catch (e) {
        console.log(e)
        next(e)
    }
}
// NOTE see profile
exports.profile = async function (req, res, next) {
    try {
        let find_user = await User.findOne(req.session.member).select('name email img')
        res.send({ status: true, msg: 'succes', data: find_user })
    } catch (e) {
        console.log(e)
        next(e)
    }
}
