const mongoose=require("mongoose") ;

const listSchema = new mongoose.Schema({

    Title:{type:String,required:true} , 
    Year:{type:Number,required:true} , 
    imdbID:{type:String,required:true} ,
    Type:{type:String,required:true} ,
    Poster:{type:String,required:true}
   
})

const list = mongoose.model("list",listSchema) ; 

module.exports = list ;