const User = require('./User');
const Blog = require('./Blog');

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  as: 'blogs', 
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user', 
});

module.exports = { User, Blog };

