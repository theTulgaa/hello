import React, {useContext, useState, useEffect} from 'react'
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';
import toast  from 'react-hot-toast';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";


// every time posts changes we rerender
// wait do i really need dislike like button
// if user click if liked like -- 1 otherwise  +== 1

export const Home = () => {
  const { user } = useContext(UserContext);
  const {setPosts} = useContext(UserContext);
  const {posts} = useContext(UserContext);
  // const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      // https://hello-1-4kds.onrender.com/addpost
      const response = await axios.get('https://hello-1-4kds.onrender.com/addpost'); // API call to get posts
      setPosts(response.data); // Set posts in state
      setLoading(false); 
      toast.success("Successfully get posts from database.")
      console.log("Successfully fetched data.")
      
    } catch (err) {
      toast.error("Could not get posts from database.") // Set error message
      setLoading(false); // Turn off loading state
    }
  };

  // useEffect to fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);
   
   const handleLikeToggle = async (postId) => {
    try {
      //https://hello-1-4kds.onrender.com/addpost/${postId}
      const response = await axios.post(`https://hello-1-4kds.onrender.com/addpost/${postId}`, { username: user.username });
      // setPosts(response.data)
      setPosts(prevPosts => prevPosts.map(post => post._id === postId ? response.data.updatedPost : post));
    } catch (error) {
      toast.error('log in to like or something went wrong!');
    }
  };

  if ( loading) {
    return <h1 className='text-center'>LOADING ..... </h1>
  }

  return (
    <div className='bg-gradient-to-r from-teal-400 to-blue-500 h-screen flex flex-col overflow-y-auto'>
      <h1 className='text-center text-xl'><span className='text-black'>{user ? <h1>logged in as: {user.username}</h1> : <h1>Please log in again to like and add post. When you refresh page your cookie will be deleted.</h1>}</span></h1>
      <header className='flex justify-between p-5 items-center top-0 z-50 sticky outline rounded m-2 bg-blue-600'>
        <div>
          <h1 className='font-bold bg-gradient-to-r from-white to-green-500 bg-clip-text text-transparent'>Өөрийн үзэл бодлоо энд илэрхийл. We support democracy.</h1>
        </div>
        <div>
          <Link to="/addpost"><button className='outline rounded px-3 mx-4 bg-gradient-to-r from-purple-400 pt-2 pb-2 '>add post</button></Link>
          <button className='outline rounded px-3 mx-4 bg-gradient-to-r from-purple-400 pt-2 pb-2'>log out</button>
        </div>
      </header>
      <div className='flex flex-col justify-center items-center'>
        {posts.length === 0 ? (
        <h1>No posts available</h1>
      ) : (
        posts.slice().reverse().map((post) => (
          <div key={post._id} className='outline p-4 flex flex-col bg-red w-1/2 h-[400px] rounded mt-4 mb-4'>
            <div className='flex justify-between items-center text-white p-2'>
              <h1>{post.author}</h1>
              <h1>{new Date(post.createdAt).toLocaleString()}</h1>
            </div>
            <hr />
            <div className='w-full flex-1 mt-2 mb-2'>
              <p className='break-words'>{post.idea}</p>
            </div>
            <hr />
            <div className='text-white p-2 items-center flex justify-center'>
              <div className='flex flex-row items-center'>
                <button onClick={() => handleLikeToggle(post._id)}>{user &&post.likedby.includes(user.username) ? <FaHeart size={20}/> : <CiHeart size={25}/> }</button>
                <samp>{post.likes}</samp>
              </div>
            </div>
          </div>
        ))
      )}
      <h1>END OF THE FEED.</h1>
      </div>
    </div>
  )
}
