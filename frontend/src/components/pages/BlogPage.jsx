/** @format */
import React, { useEffect, useState } from "react";
import Navbar from "./miscellaneous/Navbar";
import { UserState } from "../Context/UserContext";
import { useNavigate } from "react-router";

function BlogPage() {
  const { userDetails, setCurrOpenBlog, currOpenBlog } = UserState();
  const [fetchBlogs, setFetchBlogs] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);
  const [fetchAgain, setFetchAgain] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if userDetails is null
    if (userDetails === null) {
      navigate('/login');
    } else {
      // Fetch user data and set it to loggedUser
      setLoggedUser(userDetails);
    }
  }, [userDetails, navigate]);

  const headers = {
    'Authorization': 'Bearer ' + userDetails.token, // Replace 'yourAuthToken' with the actual token
    'Content-Type': 'application/json', // You can include other headers if needed
  };



  useEffect(() => {
    // Your fetch logic here
    async function fetchBlog() {
      try {
        const response = await fetch(`http://localhost:5000/api/user/blog/${fetchAgain}`, { headers });
        const data = await response.json();
        var res = JSON.stringify(data);
        var res2 = JSON.parse(res);
        var blogs = res2.blog;
        if (blogs) {
          setFetchBlogs(blogs);
          // console.log(totalPage);
        }
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      }
    }
    fetchBlog();
  }, [fetchAgain]);

  const handleOpenBlog = async (title) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/blog/currblog', {
        method: 'POST',
        headers,
        body: JSON.stringify({ title })
      });
      const data = await response.json();
      // console.log(data.blog.toArray());
      console.log(data);
      setCurrOpenBlog(data.blog);
      console.log(currOpenBlog._id);
      navigate('/currblog')
      // setCurrBlog(data.blog);

    } catch (error) {
      console.error("Error fetching user blogs:", error);
    }
  };




  return (
    <>
      <Navbar />
      {/* Rest of your component's JSX */}
      {loggedUser && (
        <div className="mainContainer">
          <div className="container_A">
            <h3 className="greeting">Welcome..</h3>
            <h1 className="greet-name">{loggedUser.name}</h1>
            <div className="btn-container">
              <button className="btn btn-a" onClick={() => navigate('/add_new_blog')}>Add new Blog</button>
            </div>
          </div>
          <div className=""></div>

          <div className="container_B">
            <div className="container">
              <div className="container container-b-1">
                <button className="btn btn-b" onClick={() => { setFetchAgain('getblog') }}>Your Blogs</button>
                <button className="btn btn-b" onClick={() => { setFetchAgain('all') }}>Global Blogs</button>
              </div>
              <div className="container container-b-2">
                <div className="blog-display">
                  {fetchBlogs.map((blog) => {
                    return (
                      <span onClick={() => { handleOpenBlog(blog.title) }} key={blog._id} className="span-blog"><p className="blog-title-text">{blog.title}</p> <br /></span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
      )}
    </>
  );
}

export default BlogPage;
