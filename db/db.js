const mongoose = require("mongoose");
try {
    mongoose.connect(`mongodb://127.0.0.1:27017/webboard`, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: true,
        // autoReconnect: true,
    });
    console.log('##### database connect ######')
} catch (error) {
    console.log(error)
}
