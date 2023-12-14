const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
      validate: true,
    });

    console.log('Users created:', users);

    for (const blog of blogData) {
      await Blog.create({
        ...blog,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    console.log('Blogs created successfully.');

    process.exit(0);
  } catch (error) {
    console.error('Error in seedDatabase:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
};

seedDatabase();
