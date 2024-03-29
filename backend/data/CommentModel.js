import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  date : { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blogId : { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true }
})

const Comment = mongoose.model('comment', blogSchema);
export default Comment;


