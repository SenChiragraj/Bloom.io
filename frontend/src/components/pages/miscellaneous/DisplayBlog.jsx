import React, { useEffect, useState } from 'react';
import { UserState } from '../../Context/UserContext';
import { useNavigate, useParams } from 'react-router';
import '../../../index.css';
import CommentSection from './CommentSection';

const DisplayBlog = () => {
  const { userDetails, userToken } = UserState();
  const navigate = useNavigate();
  const [currOpenBlog, setCurrOpenBlog] = useState({});
  const { id } = useParams(); // Assuming your route parameter is named 'id'
  console.log(userToken);
  const headers = {
    'Authorization': 'Bearer ' + userToken,
    'Content-Type': 'application/json',
  };

  console.log(id);

  useEffect(() => {
    async function handleFetchCurrBlog() {
      try {
        const response = await fetch(`http://localhost:5000/api/user/blog/${id}`, {
          method: 'GET',
          headers
        });
        const data = await response.json();
        setCurrOpenBlog(data.blog);
      } catch (error) {
        console.error('Error fetching current blog:', error);
      }
    }
    handleFetchCurrBlog();
  }, [id]); // Add id as a dependency to fetch the blog when id changes

  const dateString = new Date(currOpenBlog?.createdAt);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <>
      {currOpenBlog && (
        <div className='mainContainer navContainer'>
          <p className='site-title' onClick={() => navigate('/')}>Bloom.io</p>
          <div className="btn-container">
            {
              userDetails?._id === currOpenBlog?.author?._id && (
                <button className="btn btn-nav hover:text-white" onClick={() => navigate(`/edit/${currOpenBlog._id}`)}>Edit Blog</button>
              )
            }
            <button className='btn btn-nav' onClick={() => navigate('/')}>Go Back</button>
          </div>
        </div>
      )}
      <div className="blog-container">
        <div className="hiddenContainer">
          <h1 className="blog-title">{currOpenBlog.title}</h1>
          <div className="blog-content-container">
            <img src={currOpenBlog.pic} alt="" className=' h-80 object-cover  ' />
            <div className="">
              <p className='content'>{currOpenBlog.content}</p>
              <div className="blog-author-container">
                <p className='authorName'>Author: {currOpenBlog.author?.name}</p>
                <p className='authorname'>{dateString.getDate()} {monthNames[dateString.getMonth()]} {dateString.getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <CommentSection blogID={currOpenBlog._id} /> */}
      </div>
    </>
  );
};

export default DisplayBlog;
