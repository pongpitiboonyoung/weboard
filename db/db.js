const mongoose = require("mongoose");

try {
    console.log('DB Name :' ,process.env.DB )
    mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB}`, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: true,
        // autoReconnect: true,
    },function(err,result){
        if(err){
            console.log(err)
        }else{
            console.log('##### database connect ######')
        }
    });
} catch (error) {
    console.log(error)
}

