import Blog from "../data/BlogModel.js"


export const getAllBlogs = async(req, res) => {
  try {
    let blog = await Blog.find();
    if(blog){
      res.status(201).json({blog})
    }
  }catch(err){
    res.status(401).json({Error : err, message : 'Error in fetching all blogs' })
  }
}

export const getCurrentUserBlogs = async(req, res) => {
  try {
    let blog = await Blog.find({author : req.user._id});
    if(blog){
      res.status(201).json({blog})
    }
  }catch(err){
    res.status(401).json({Error : err, message : 'Error in fetching all blogs' })
  }
}

export const getCurrentBlog = async(req, res) => {
  const {title} = req.body;
  try {
    let blog = await Blog.findOne({title: title}).populate('author', '-password');
    if(blog){
      res.status(201).json({blog})
    }else
      res.status(401).json({Error : err, message : 'Blog not found' })

  }catch(err){
    res.status(401).json({Error : err, message : 'Error in fetching all blogs' })
  }
}

export const addBlog = async (req, res) => {
  const { title, content, pic } = req.body;

  try {
    let existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res.status(401).json({ message: 'Blog already exists with the same title' });
    }

    const newBlog = new Blog({
      title,
      content,
      pic,
      author: req.user._id // Assuming req.user contains the logged-in user's information
    });

    await newBlog.save();

    // Populate the author's information
    const populatedBlog = await Blog.findById(newBlog._id).populate('author', '-password');

    return res.status(201).json({ blog: populatedBlog });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const upDateTitle = async (req, res) => {
  const {title} = req.body;
  try {
    let blog = await Blog.findOneAndUpdate({author : req.user._id}, {
      title
    });

    blog = await Blog.findById(blog._id).populate('author', '-password');

    return res.json({blog});
  }catch(error) {
    throw new Error(error);
  }
}

export const deleteBlog = async (req, res) => {
  const { title } = req.body;
  try {
    // Find the blog by its title
    let blog = await Blog.findOneAndDelete({ title: title });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    return res.json({ message: 'Blog Removed Successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message, message: 'Error in deleting the blog' });
  }
}
