import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const handleGet = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/'); // Replace '/api/auth' with your actual API endpoint
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  // handleGet();
  // }, []);
  

  return (
    <UserContext.Provider value={{ user, setUser, posts, setPosts }}>
      {children}
    </UserContext.Provider>
  );
};
