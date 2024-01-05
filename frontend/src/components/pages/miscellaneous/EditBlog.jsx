import React, { useState, useEffect } from 'react'
import { UserState } from '../../Context/UserContext'
import { useNavigate, useParams } from 'react-router'

const EditBlog = () => {

  const { userDetails } = UserState();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [blogDetails, setBlogDetails] = useState({})

  useEffect(() => {
    fetchBlog();
  }, [userDetails, navigate]);

  const fetchBlog = async () => {
    // e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/user/blog/${blogId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + userDetails.token, // Replace 'yourAuthToken' with the actual token
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())

      setBlogDetails(res.blog);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateNewBlog = async (e) => {
    e.preventDefault();
    const { title, pic, content } = blogDetails;
    console.log(title, pic, content);
    try {
      console.log('ran');
      await fetch('http://localhost:5000/api/user/blog/update', {
        method: 'PUT',
        body: JSON.stringify({ title, pic, content }),
        headers: {
          'Authorization': 'Bearer ' + userDetails.token, // Replace 'yourAuthToken' with the actual token
          'Content-Type': 'application/json'
        }
      }).then(() => navigate('/currblog'));

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
      { <div className="mt-4 grow flex flex-col items-center justify-around">
          <div className="mt-20">
            <h1 className="text-center greet-name heading">Edit Blog</h1>
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
              <div className="flex flex-row gap-2">
                <button className="bg-primary text-white font-semibold">Add New</button>
                <button className="font-semibold bg-primary text-white" onClick={() => navigate('/blog_page')}>Go Back</button>
              </div>
            </form>
          </div>
        </div>}
    </>
  );
}
export default EditBlog