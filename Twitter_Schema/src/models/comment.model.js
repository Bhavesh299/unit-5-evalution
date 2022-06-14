const mongoose = require("mongoose") ;
const commentSchema = new mongoose.Schema({

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {

    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}
, {
  timestamps: true,
  versionKey: false,
}
);


module.exports = mongoose.model("comment", commentSchema); 