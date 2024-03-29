const User = require('../../model/user/user')

const fs = require('fs')
const jwt = require('jsonwebtoken');

// NOTE register
exports.register = async function (req, res, next) {
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await User.encryptPassword(req.body.password)
        })
        await user.save()
        res.status(200).send({ status: true, msg: 'succes', data: user })
    } catch (e) {
        // console.log(e)
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
        var token = jwt.sign({ id: find_user._id }, process.env.Secret);
        find_user.token = token
        await find_user.save()
        res.cookie('token', token) // options is optional
        // res.cookie('token', token, { maxAge: 1 * 60 * 60 * 1000 }) // options is set maxAge 1 Hour
        // req.session.member = find_user
        res.status(200).send({ status: true, msg: 'succes', data: null })
    } catch (e) {
        // console.log(e)
        next(e)
    }
}
// NOTE edit profile
exports.edit_profile = async function (req, res, next) {
    try {
        let find = await User.findById(req.user._id || req.session.member._id)
        let update = await User.updateOne(
            { _id: find._id },
            {
                $set: {
                    img: req.file ? req.file : find.img,
                    name: req.body.name,
                    email: req.body.email,
                }
            })
        if (req.file && update.modifiedCount != 0) {
            // await remove_file(find.img.filename).then((result) => { console.log(result) }).catch((e) => { console.log(e) })
            // await remove_file_test(find.img.filename)
        }
        res.status(200).send({ status: true, msg: 'succes', data: update })
    } catch (e) {
        // console.log(e)
        next(e)
    }
}
// NOTE edit password
exports.edit_password = async function (req, res, next) {
    try {
        let update = await User.updateOne(
            { _id: req.user._id || req.session.member._id },
            {
                $set: {
                    password: await User.encryptPassword(req.body.password)
                }
            })
        res.status(200).send({ status: true, msg: 'succes', data: update })
    } catch (e) {
        // console.log(e)
        next(e)
    }
}
// NOTE logout
exports.logout = async function (req, res, next) {
    try {
        // delete req.session.member
        let find_user = await User.findOne({ token: req.cookies['token'] })
        find_user.token = "no_token"
        await find_user.save()
        res.clearCookie("token");
        res.status(200).send({ status: true, msg: 'succes' })
    } catch (e) {
        // console.log(e)
        next(e)
    }
}
// NOTE see profile
exports.profile = async function (req, res, next) {
    try {
        let find_user = await User.findOne({ _id: req.user._id || req.session.member._id }).select('name email img')
        res.status(200).send({ status: true, msg: 'succes', data: find_user })
    } catch (e) {
        // console.log(e)
        next(e)
    }
}
// NOTE remove after update profile
function remove_file(filename) {
    return new Promise((resolve, rejects) => {
        fs.unlink(`./public/uploads/${filename}`, (err) => {
            if (err) {
                resolve(err);
            }
            resolve('deleted');
        })
    })
}

async function remove_file_test(filename) {
    await fs.unlink(`./public/uploads/${filename}`, (err) => {
        if (err) {
            console.log(err)
        }
        console.log('deleted');
    })
}
