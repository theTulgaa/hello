import React, {useState, useContext} from 'react'
import { UserContext } from '../../context/userContext';
import { toast } from  'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';


export const AddPost = () => {
  const { user } = useContext(UserContext);
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Sending a POST request using axios
    // https://hello-1-4kds.onrender.com/addpost
    const res = await axios.post('https://hello-1-4kds.onrender.com/addpost', {
      author: user.username, // Assuming 'user' is your logged-in user object
      idea: text // Post content as "idea"
    });

    // Handle success
    console.log('Post created:', res.data); // Log the response data
    setText(''); // Reset the input field
    toast.success("Post created successfully"); // Show success notification
  } catch (err) {
    // Handle error
    const errorMessage = err.response?.data?.error || 'Could not create post'; // Get server error or fallback
    toast.error("Log in to add post!"); // Show error notification
    console.error('Error creating post:', err); // Log the error for debugging
  }
};


  return (
    <div className='bg-gradient-to-r from-teal-400 to-blue-500 h-screen flex flex-col items-center overflow-y-auto'>
      <h1 className='text-center font-bold text-xl m-2'>{user ? <h1>Add post as {user.username}</h1> : <h1>Please log in to add post. When you refresh page your cookie will be deleted.</h1>}</h1>
      <header className='text-center outline rounded p-5 m-3'>
        <h1 className='font-bold bg-gradient-to-r from-white to-green-500 bg-clip-text text-transparent'>Та хэнээс ч юунаас ч санаа зовохгүй мөн айж эмээлгүйгээр өөрийн бодлоо илэрхийлж, басхүү уг сэдвийн хүрээнд бусадтай мэтгэлцэх нь хамгийн чухал.</h1>
      </header>

      {/* <h1>Add Post by {user ? <h1>{user.username}</h1> : null}</h1>
      <input type="text" placeholder='Enter post here' value={text} onChange={(e) => setText(e.target.value)}/>
      <button onClick={handleSubmit}>Add Post</button> */}
      <div className='flex flex-row justify-between items-center space-x-4 w-1/2 p-4 rounded flex-2 '>
        {/* <input type="text" placeholder='Add post here' className='flex flex-1 outline-none border-none border-b-2 border-blue-400 p-2 resize-none box-border'/> */}
        <textarea name="" id="" cols="30" rows={10} placeholder='Add post here' className='flex flex-1 rounded p-2 outline-none bg-lime-300'></textarea>
        <button onClick={handleSubmit} className='outline rounded bg-gradient-to-r from-purple-400 h-full p-2 font-bold'>Add post</button>
      </div>
      <Link to="/home"><button className='rounded outline p-5 bg-green-300'>BACK</button></Link>
    </div>
  )
}
