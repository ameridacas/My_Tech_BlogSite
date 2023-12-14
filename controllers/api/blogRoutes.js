const express = require('express');
const router = express.Router();
const { Blog, User } = require('../../models');
// const { checkLoggedIn } = require('../../utils/auth');

router.post('/blogs', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      include: [{ model: User }],
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/blogs', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [User],
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users/blogs', async (req, res) => {
  try {
    const UserBlogData = await Blog.findAll({
      include: [{ model: User }],
      where: {
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(UserBlogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/blogs/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const blog = await Blog.findByPk(req.params.id);
    const blogData = await blog.update({
      title: title,
      description: description,
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });

    if (!blogData) {
      res.status(500).json({ message: 'No Blog was found with that id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with that id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
