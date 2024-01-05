import React, {useState, useEffect} from 'react'
import { UserState } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const CommentSection = ({blogID}) => {

  const { userDetails } = UserState();
  const [comment, setComment] = useState();
  const [pastComment, setPastComment] = useState([]);
  const navigate = useNavigate();

  console.log(blogID);

  // const dateString = new Date(comment && comment.date);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    // Redirect to login if userDetails is null
    if (userDetails === null) {
      navigate('/login');
    }
    fetchComments();
  }, []);

  async function fetchComments() {
    // e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/user/blog/comment/${blogID}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + userDetails.token, // Replace 'yourAuthToken' with the actual token
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      console.log(res.comments);
      setPastComment(res.comments);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function addComments(e){
    e.preventDefault();
    console.log(blogID);
    try {
      const res = await fetch(`http://localhost:5000/api/user/blog/comment/add`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + userDetails.token, // Replace 'yourAuthToken' with the actual token
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment, blogID })
      }).then((res) => res.json())
      console.log(res);
      setPastComment(res.comments);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePost = () => {
    addComments();
  }

  return (
    <div className="h-max">
  <div className="flex flex-col justify-between mx-10">
    <div className="">
      <h1 className='text-xl font-semibold'>Comment Section</h1>
      <input className='border-2 p-2 rounded my-4 w-64' type="text" value={comment} placeholder='Add Comment' onChange={(e) => setComment(e.target.value)} />
      <button className='bg-danger text-white font-semibold p-2 rounded mx-2' onClick={addComments}>Post</button>
    </div>
  </div>
  {
     pastComment && pastComment.map((comm) => (
      <div key={comm._id} className='flex flex-row gap-3 mx-10 my-2' >
        <img src={comm.author.pic} alt="" className='h-14 w-14 rounded-full object-cover' />
        <div className="">
          <p className='text-lg '>{comm.comment}</p>
          <p>{(new Date(comm.date)).getDate()} {monthNames[(new Date(comm.date)).getMonth()]} {(new Date(comm.date)).getFullYear()}</p>
        </div>
      </div>
    ))
  }
</div>
  )
}

export default CommentSection