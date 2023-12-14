const express = require('express');
const router = express.Router();
const { Blog } = require('../models');
const { checkLoggedIn } = require('./auth'); 

// Route to get all blogs
router.get('/blogs', checkLoggedIn, async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      // Include any necessary associations or conditions
    });

    res.render('blogs', { blogs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to render the form for creating a new blog
router.get('/blogs/create', checkLoggedIn, (req, res) => {
  res.render('create-blog');
});

// Route to create a new blog
router.post('/blogs/create', checkLoggedIn, async (req, res) => {
  try {
    const { name, description } = req.body;
    const user_id = req.session.user_id;
    const newBlog = await Blog.create({
      name,
      description,
      user_id,
    });

    res.redirect('/blogs'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
