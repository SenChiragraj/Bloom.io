import React, { useEffect } from 'react'
import { UserState } from '../../Context/UserContext'
import { useNavigate } from 'react-router';
import '../../../index.css'

const DiplayBlog = () => {
  const { currOpenBlog } = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    function fetch() {
      if (currOpenBlog == null)
        navigate('/blog_page');
    }

    fetch();
  }, []);

  const dateString = new Date(currOpenBlog.createdAt);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <>
      <div className='mainContainer navContainer'>
        <p className='site-title' onClick={() => navigate('/blog_page')}>Bloom.io</p>
        <div className="btn-container">
          <button className='btn btn-nav' onClick={() => navigate('/blog_page')}>Go Back</button>
        </div>
      </div>
      {
        (
          <div className="blog-container">
            <div className="hiddenContainer">
              <h1 className="blog-title">{currOpenBlog.title}</h1>
              <div className="blog-content-container">
                <img src={currOpenBlog.pic} alt="" />
                <div className="">
                  <p className='content'>{currOpenBlog.content}</p>
                  <div className="blog-author-container">
                    <p className='authorName'>Author: {currOpenBlog.author.name}</p>
                    <p className='authorname'>{dateString.getDate()} {monthNames[dateString.getMonth()]} {dateString.getFullYear()}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
    </>
  )
}

export default DiplayBlog
