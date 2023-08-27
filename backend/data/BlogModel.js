import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  pic: { type: String},
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Blog = mongoose.model('blog', blogSchema);
export default Blog;