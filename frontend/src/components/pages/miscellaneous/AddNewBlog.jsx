import React, { useState, useEffect } from 'react'
import { UserState } from '../../Context/UserContext'
import { useNavigate } from 'react-router'

const AddNewBlog = () => {

  const { userDetails } = UserState();
  const navigate = useNavigate();
  const [blogDetails, setBlogDetails] = useState({
    title: '',
    content: '',
    pic: '',
  })

  useEffect(() => {
    // Redirect to login if userDetails is null
    if (userDetails === null) {
      navigate('/login');
    }
  }, [userDetails, navigate]);

  const headers = {
    // You can include other headers if needed
  };

  const updateNewBlog = async (e) => {
    e.preventDefault();
    const { title, pic, content } = blogDetails;
    console.log(title, pic, content);
    try {
      console.log('ran');
      await fetch('http://localhost:5000/api/user/blog/add', {
        method: 'POST',
        body: JSON.stringify({ title, pic, content }),
        headers: {
          'Authorization': 'Bearer ' + userDetails.token, // Replace 'yourAuthToken' with the actual token
          'Content-Type': 'application/json'
        }
      }).then(() => navigate('/blog_page'));

    } catch (error) {
      console.error("Error:", error);
    }

  };


  return (
    <>
      {/* <div className='mainContainer navContainer'>
        <p className='site-title'>Bloom.io</p>
        <div className="btn-container">
          <button className='btn btn-nav'>Profile</button>
          <button className='btn btn-nav' onClick={() => navigate('/')}>Logout</button>
        </div>
      </div> */}
      <div className="mt-4 grow flex flex-col items-center justify-around">
        <div className="mt-20">
          <h1 className="text-center greet-name heading">Add New Blog</h1>
          <form action="" className="max-w-md mx-auto" onSubmit={updateNewBlog}>
            <input
              type="title"
              value={blogDetails.title}
              onChange={(e) =>
                setBlogDetails((prevDetails) => ({
                  ...prevDetails,
                  title: e.target.value,
                }))
              }
              placeholder="New Blog Title"
            />
            <textarea
              className=''
              type="content"
              value={blogDetails.content}
              onChange={(e) =>
                setBlogDetails((prevDetails) => ({
                  ...prevDetails,
                  content: e.target.value,
                }))
              }
              placeholder="Blog Content"
            />
            <input
              type="title"
              value={blogDetails.pic}
              onChange={(e) =>
                setBlogDetails((prevDetails) => ({
                  ...prevDetails,
                  pic: e.target.value,
                }))
              }
              placeholder="Image URL"
            />
            <button className="primary">Add New</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddNewBlog