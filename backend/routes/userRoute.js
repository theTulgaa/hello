import User  from '../models/userModel.js';
import express from 'express';

const router = express.Router();

router.post('/', async (request, response) => {
    const { username, password } = request.body;
    if (!username || !password) {
        return response.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return response.status(400).json({ message: 'Username already exists' });
        }
        const newUser = {
        username: request.body.username,
        password: request.body.password,
        };

        const user = await User.create(newUser);
        return response.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
  try {
    const users = await User.find({});

    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;