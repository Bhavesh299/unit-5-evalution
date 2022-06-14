const mongoose = require("mongoose") ;
require('dotenv').config() ;

const connect = () => {

    return mongoose.connect("mongodb://localhost:27017/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
        }) ;
       
}
module.exports = connect ;