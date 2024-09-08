import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: String, // Store the username of the post creator
    required: true
  },
  idea: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set the creation date
  },
  likes: {
    type: Number,
    default: 0
  },
  likedby: [{
    type: String
  }],
  comments: [{
    author: {
      type: String, // Store the username of the comment creator
      required: true
    },
    text: {
      type: String, // Comment content
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});

const Post = mongoose.model('Post', postSchema);
export default Post;
