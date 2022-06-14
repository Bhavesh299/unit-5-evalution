
const express = require("express") ;
const User = require("../models/user.model") ;
const router = express.Router() ;

router.get("" , async (req,res) => {
    try{
        const user = await User.find().lean().exec() ; // find all users
        return res.status(200).send(user) ; // send the response
    }
    catch(err){
        return res.status(500).send({Error:err.message}) ;  // send the error
    }
   
});

router.post("" , async (req,res) => {
    try{
      const user = await User.create(req.body) ; // create the user
      return res.status(201).send(user) ; // send the response
    }
    catch(err){
      return res.status(400).send({message:err.message}) ; 
    }
});

router.get("/:id" , async (req,res) => {
  try{
    const user = await User.findOne(req.body.id).lean().exec() ; // find the user
    return res.status(200).send(user) ; // send the response
  }catch(err){
    return res.status(500).send({message:err.message}) ;
  }
});

router.patch("/:id" , async (req,res) => {
  try{
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{ new: true })  // update the user
      .lean().exec();
    return res.status(200).send({user:user}) ; // send the response
  }catch(err){
    return res.status(500).send({message:err.message}) ;
  }
});

router.delete("/:id" , async (req,res) => { // delete the user
  try{
    const user = await User.findByIdAndDelete(req.params.id).lean().exec() ; // delete the user
    return res.status(200).send(user) ; 
  }
  catch(err){
    return res.status(500).send({message:err.message});
  }
});

module.exports = router ;