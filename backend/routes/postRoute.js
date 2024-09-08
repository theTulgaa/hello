import Post from '../models/postModel.js';
import express from 'express';

const router = express.Router();

router.post("/", async (req, res) => {
    const {author, idea} = req.body;
    try {
        const newPost = {
            author: author,
            idea: idea,
        }
        const post = await Post.create(newPost);
        return res.status(201).send(post);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
})

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts
    res.status(200).json(posts);     // Send posts as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

router.post('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { username } = req.body; // Assume username is sent in the request body

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    // Check if the user has already liked the post
    const updateOps = post.likedby.includes(username)
      ? { 
          $pull: { likedby: username }, // Remove the username from likedby
          $inc: { likes: -1 } // Decrease the likes count
        }
      : { 
          $push: { likedby: username }, // Add the username to likedby
          $inc: { likes: 1 } // Increase the likes count
        };
    const updatedPost = await Post.findByIdAndUpdate(postId, updateOps,  { new: true });
    // if (post.likedby.includes(username)) {
    //     // in case user has already liked post
    //     post.likedby = post.likedby.filter(user => user !== username);
    //     post.likes -= 1;
    //     // return res.status(400).send('User has already liked this post');
    // }
    // else {
    //     post.likedby.push(username);
    //     post.likes += 1;
    // }

    // Add the user's username to the likedby array
    // post.likedby.push(username);
    // post.likes += 1;

    await post.save();
    res.status(200).json({ 
      message: 'Like status toggled successfully', 
      updatedPost 
    });
    // res.status(200).send('Post liked successfully');
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).send('Server error');
  }
});

// dislike

// router.post('/:postId', async (req, res) => {
//   const { postId } = req.params;
//   const { username } = req.body;

//   try {
//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).send('Post not found');
//     }

//     if (!post.likedby.includes(username)) {

//       return res.status(400).send('User has not liked this post');
//     }

//     post.likedby = post.likedby.filter(user => user !== username);
//     post.likes -= 1;

//     await post.save();
//     res.status(200).send('Post unliked successfully');
//   } catch (error) {
//     console.error('Error unliking post:', error);
//     res.status(500).send('Server error');
//   }
// });


export default router;

/*
import React, { useState } from 'react';

const AddPost = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author: 'batman', text }), // Assuming 'batman' is the logged-in user
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Could not create post');
      }

      console.log('Post created:', data); // Handle success (e.g., reset form, update posts)
      setText(''); // Reset the form
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button type="submit">Post</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddPost;

*/