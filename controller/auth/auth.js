const User = require('../../model/user/user')
const jwt = require('jsonwebtoken');

exports.auth = async function (req, res, next) {
    try {
        // if (!req.session.member) {
        //     throw new Error('login')
        // }
        let find_user = await User.findOne({ token: req.cookies['token'] } || { _id: req.session.member })
        if (!find_user) {
            throw new Error("Login !!!")
        }
        let decoded = jwt.verify(find_user.token, process.env.Secret, (err, decoded) => {
            if (err) {
                throw new Error("Error Token !!!")
            }
            return decoded
        })
        req.user = find_user
        next()
    } catch (e) {
        console.log(e)
        next(e)
    }
}