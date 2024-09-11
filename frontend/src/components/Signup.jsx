import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from  'react-hot-toast';

export const Signup = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //  const { enqueueSnackbar } = useSnackbar();

  const handleCreateUser = (e) => {
    e.preventDefault()
    if (!username || !password) {
      // console.error('Username and password are required');
      toast.error('Username and password are required!')
      return;
    }
    const data = {
      username,
      password,
    }
    setLoading(true);
    axios
    // https://hello-1-4kds.onrender.com/signup
    .post("https://hello-1-4kds.onrender.com/signup", data)
    // .post("http://localhost:8000/signup", data)
    .then(() => {
      setLoading(false);
      toast.success("You are signed up to BEYOND.")
      navigate('/');
    })
    .catch((error) => {
        toast.error('This username is already in use!')
        setLoading(false);
        // console.log(error);
    });
  }

  return (
    <div className='bg-black h-screen flex items-center justify-center flex-col'>
      {loading ? (<h1>CREATING USER...</h1>) : (<h1 className='text-white'>Welcome to BEYOND</h1>)}
      <div className='rounded bg-white w-1/2 h-1/2'>
        <br />
        <h1 className='text-center'>SIGN UP</h1>
        <div className='flex flex-col m-10'>
          <input type="text" placeholder='Enter your username' className='p-2 rounded border outline-none' value={username} onChange={(e) => setUserName(e.target.value)}/>
          <br />
          <input type="password" placeholder='Enter your password' className='p-2 rounded border outline-none' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <br />
          <button className='border rounded p-2' onClick={handleCreateUser}>SUBMIT</button>
        </div>
      </div>
    </div>
  )
}
//
//
//
