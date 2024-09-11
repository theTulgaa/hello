import React,  { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { toast } from  'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Username and password are required!');
      return;
    } 
    setLoader(false);

    const data = { username, password };

    try {
      // https://hello-1-4kds.onrender.com/
      const response = await axios.post("https://hello-1-4kds.onrender.com/", data);
      toast.success(response.data.message); // Assuming response data has a message
      setUser(response.data); 
      navigate("/home")
      // Update user context with user data from response
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
      console.log(error);
      setLoader(false)
    }
    finally {
      setLoader(false)
      //
    }
  };
  if(!loader) {
    return (
      <h1 className='text-center'>JAAHAN HULEE BRO .....</h1>
    )
  }
 

  return (
    <div className='bg-black h-screen flex items-center justify-center flex-col'>
      <h1 className='text-white'>Welcome to BEYOND</h1>
      <div className='rounded bg-white w-1/2 h-1/2'>
        <br />
        <h1 className='text-center'>LOGIN</h1>
        <div className='flex flex-col m-10'>
          <input type="text" placeholder='Username' className='p-2 rounded border outline-none' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <br />
          <input type="password" placeholder='Password' className='p-2 rounded border outline-none' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <h2 className='text-end'>forgot password?</h2>
          <br />
          <button className='border rounded p-2' onClick={handleLogin}>LOGIN</button>
        </div>
        <div>
          <Link to="/signup"><h2 className='text-center' >SIGN UP</h2></Link>
        </div>
        {user ? <h1>{user.username}</h1> : <h1>no name</h1>}
      </div>
    </div>
  )
}
//