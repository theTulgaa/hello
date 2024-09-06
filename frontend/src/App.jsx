import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home } from './components/Home';
import { Signup } from './components/Signup';
import { AddPost } from './components/AddPost';
import { Login } from './components/Login';


function App() {
  
  useEffect(() => {
    document.title = "BEYOND";
  })

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/addpost' element={<AddPost />}/>
    </Routes>
    </>
  )
}

export default App
