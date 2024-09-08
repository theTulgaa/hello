import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home } from './components/Home';
import { Signup } from './components/Signup';
import { AddPost } from './components/AddPost';
import { Login } from './components/Login';
import {Toaster} from  'react-hot-toast';
import { UserProvider } from '../context/userContext';

function App() {
  
  useEffect(() => {
    document.title = "BEYOND";
  })

  return (
    <>
    <UserProvider>
    <Toaster position='top-center' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/addpost' element={<AddPost />}/>
    </Routes>
    </UserProvider>
    </>
  )
}

export default App
