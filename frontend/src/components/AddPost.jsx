import React, {useState, useContext} from 'react'
import { UserContext } from '../../context/userContext';
import { toast } from  'react-hot-toast';
import axios from 'axios';

export const AddPost = () => {
  const { user } = useContext(UserContext);
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Sending a POST request using axios
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
    toast.error(errorMessage); // Show error notification
    console.error('Error creating post:', err); // Log the error for debugging
  }
};


  return (
    <div>
      <h1>Add Post by {user ? <h1>{user.username}</h1> : null}</h1>
      <input type="text" placeholder='Enter post here' value={text} onChange={(e) => setText(e.target.value)}/>
      <button onClick={handleSubmit}>Add Post</button>
    </div>
  )
}
