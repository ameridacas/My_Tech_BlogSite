const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      set(value) {
        this.setDataValue('email', value.trim().toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
       validate: {
        min: 8,
        max: 10
       },
      // {
      //   isStrongPassword(value) {
      //     const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      //     if (!strongPasswordRegex.test(value)) {
      //       throw new Error(
      //         'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
      //       );
      //     }
      //   },
      // },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUser) => {
        newUser.password = await User.hashPassword(newUser.password);
        return newUser;
      },
      beforeUpdate: async (updateUser) => {
        if (updateUser.changed('password')) {
          updateUser.password = await User.hashPassword(updateUser.password);
        }
        return updateUser;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;