
const express = require("express") ;

const Comment = require("../models/comment.model") ;

const router = express.Router() ;

router.get("", async (req, res) => {
  try {
    const comments = await Comment.find()  // find all comments
      .populate({
        path: "postId" , // path is the name of the field in the comment model
        select: ["title"] , // select is the name of the field in the post model
        populate: { path: "userId", select: ["firstName"] } // populate the userId field with the firstName field,
      })
      .populate({ path: "userId", select: ["firstName"] })  
      .lean()  // convert the mongoose object to a plain javascript object
      .exec() ; // execute the query

    return res.status(200).send(comments) ; // send the response
  }
  catch(err) {
    return res.status(500).send(err) ; // send the error
  }
    
});

router.post("", async (req, res) => {
    try {
      const comments = await Comment.create(req.body) ; // create the comment
      return res.status(200).send(comments) ; // send the response
    }
    catch(err) {
      return res.status(500).send(err) ; // send the error

    }
  });


router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)  
      .populate({
        path: "postId" , 
        select: ["title", "body"] , 
        populate: { path: "userId", select: ["password", "firstName"] } ,
      })
      .populate({ path: "userId", select: ["firstName"] })
      .lean()
      .exec() ;

    return res.status(201).send(comment);
  } 
  catch (err) {
    return res.status(404).send({ message: err.message }) ;
  }
});


router.patch("/:id", async (req, res) => {
  
  try {
    
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })  // update the comment
       .populate({
        path: "postId" , 
        select: ["title"] ,
        populate: { path: "userId", select: ["firstName"] } , 
      })
      .populate({ path: "userId", select: ["email"] }) // populate the userId field with the email field
      .lean() // convert the mongoose object to a plain javascript object
      .exec() ; // execute the query

    return res.status(200).send(comment) ; // send the response
  } 
  catch (err) {
    return res.status(500).send({ message: err.message }) ; 
  }
});

router.delete("/:id", async (req, res) => { 
    try {
      const comments = await Comment.findByIdAndDelete(req.params.id).lean().exec() ; // delete the comment
      return res.status(200).send(comments) ; // send the response
    }
    catch (err) {
      return res.status(500).send({ message: err.message }) ;   // send the error
    }
  });

module.exports = router ; 
