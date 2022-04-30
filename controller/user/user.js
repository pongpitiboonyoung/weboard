const User = require('../../model/user/user')
const mongoose = require('mongoose')
exports.insert = async function (req,res,next) {
    try{
        let find = await mongoose.models.User.find()
        console.log(find)
        let user = await User.create({
            name:'xxxx',
            email:'xxxx2@gmail.com',
            password:'123456'
        })
        res.send({ status:true , msg:'succes' })
    }catch(e){
        console.log(e)
        next(e)
    }
}