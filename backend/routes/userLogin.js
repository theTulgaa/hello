import User from '../models/userModel.js';
import express from 'express';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';


const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the hashed password with the provided password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Password does not match' });
    }
    
    if (validPassword) {
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if(err) throw err;
            res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }).json(user)
        });
    }
    // Generate a token if the password is valid
    
    
    // Set the token as an HTTP-only cookie
    // res.cookie('authToken', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiry

    // return res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('Server error:', error); // Log the actual error
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/', async (req, res) => {
  const token = req.cookies['token'];

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use the decoded user ID to get user data from the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Return user data or relevant information
    return res.status(200).json({ user }); // Send user data or relevant information
  } catch (error) {
    // Handle invalid token or expired token errors gracefully
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    } else {
      console.error('Server error:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }
});

export default router;
