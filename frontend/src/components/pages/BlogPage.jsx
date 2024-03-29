import React, { useEffect, useState } from "react";
import Navbar from "./miscellaneous/Navbar";
import { UserState } from "../Context/UserContext";
import { useNavigate } from "react-router";

function BlogPage() {
  const { userDetails, userToken } = UserState();
  const [fetchBlogs, setFetchBlogs] = useState([]);
  const [fetchAgain, setFetchAgain] = useState('get');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const headers = {
    'Authorization': 'Bearer ' + userToken,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/user/blog/${fetchAgain}`, {
          method: 'GET',
          headers
        });
        if (response.ok) {
          const data = await response.json();
          setFetchBlogs(data.blog);
        } else {
          // Handle non-successful response (e.g., 404)
          console.error('Failed to fetch blogs:', response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user blogs:", error);
        // Handle fetch error
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [fetchAgain, userToken]);

  return (
    <>
      <Navbar />
      {userDetails && (
        <div className="flex flex-col justify-center w-screen items-center bg-slate-200">
          <div className="flex flex-col">
            <h3 className="greeting">Welcome..</h3>
            <h1 className="greet-name">{userDetails.name}</h1>
            <div className="btn-container">
              <button className="btn btn-a" onClick={() => navigate('/add_new_blog')}>Add new Blog</button>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col justify-center w-screen items-center">
              <div className="">
                <button className="btn btn-b" onClick={() => setFetchAgain('get')}>Your Blogs</button>
                <button className="btn btn-b" onClick={() => setFetchAgain('all')}>Global Blogs</button>
              </div>
              <div className="">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="grid grid-cols-4 gap-10 mx-20">
                    {fetchBlogs && fetchBlogs.map((blog) => (
                      <div className="flex flex-col justify-center gap-2 items-center" key={blog._id} onClick={() => navigate('/currblog/' + blog._id)}>
                        <img src={blog.pic} alt="" className="h-64 object-cover" />
                        <p className="text-xl">{blog.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogPage;
