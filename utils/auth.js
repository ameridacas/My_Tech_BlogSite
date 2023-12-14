const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({
      where: { email },
    });

    // Check if the user exists and the password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.logged_in = true;
      req.session.user_id = user.id;

      // Redirect to the homepage or a dashboard after successful login
      res.redirect('/');
    } else {
      // If the user does not exist or wrong password
      res.render('login', { error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;


