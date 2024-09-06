import React from 'react'
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className='bg-black h-screen flex items-center justify-center flex-col'>
      <h1 className='text-white'>Welcome to BEYOND</h1>
      <div className='rounded bg-white w-1/2 h-1/2'>
        <br />
        <h1 className='text-center'>LOGIN</h1>
        <div className='flex flex-col m-10'>
          <input type="text" placeholder='Username' className='p-2 rounded border outline-none'/>
          <br />
          <input type="password" placeholder='Password' className='p-2 rounded border outline-none'/>
          <h2 className='text-end'>forgot password?</h2>
          <br />
          <button className='border rounded p-2'>LOGIN</button>
        </div>
        <div>
          <Link to="/signup"><h2 className='text-center' >SIGN UP</h2></Link>
        </div>
      </div>
    </div>
  )
}
//