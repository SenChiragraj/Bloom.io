import Comment from "../data/CommentModel.js";

export const getAllBlogs = async (req, res) => {

  const { blogID } = req.params;
  console.log(blogID)
  try {
    let comments = await Comment.find({ blogId: blogID.toString() }).populate('author', '-password');

    if(comments){
      res.status(201).json({comments})
    }
  }catch(err){
    res.status(401).json({Error : err, message : 'Error in fetching all comments' })
  }
}

export const addComment = async (req, res) => {
  const { comment, blogID } = req.body;
  try {

    const newComment = new Comment({
      comment,
      blogId : blogID,
      author: req.user._id // Assuming req.user contains the logged-in user's information
    });

    await newComment.save();

    // Populate the author's information
    const popComment = await Comment.findById(newComment._id);

    return res.status(201).json({ comment: popComment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};