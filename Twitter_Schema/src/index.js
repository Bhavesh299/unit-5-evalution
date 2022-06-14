
const express = require("express");
const connect = require("./configs/db")

const usersController = require("./controllers/user.controllers") ;
const postController = require("./controllers/post.controllers") ;
const commentController = require("./controllers/comment.controllers") ;

const app = express() ;

app.use(express.json()) ;

app.use("/users", usersController) ;
app.use("/tweet" , postController ) ;
app.use("/reply", commentController) ;

app.listen(6000, async () => {
  try {
    await connect() ; // connect to the database
    console.log("Server is running on port 6000") ;

  } 
  catch (err) {

    console.log(err) ; // log the error
  }
});

module.exports = app ;
