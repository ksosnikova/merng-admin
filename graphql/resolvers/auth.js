const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server-express');
const { validate } = require('../../utils/validators');
const config = require('config');

const User = require('../../models/User');

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email
    },
    config.get('jwtSecret'),
    {
      expiresIn: '1h'
    }
  );
};

module.exports = {
  Mutation: {
    registration: async (parent, { email, password }) => {
      try {
        const { valid, errors } = validate(email, password);
        if (!valid) {
          throw new UserInputError('Errors', { errors });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User exists already.');
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
          email,
          password: hashedPassword,
          isAdmin: false
        });

        const result = await newUser.save();

        const token = generateToken(result);

        return { id: newUser.id, email, token, isAdmin: newUser.isAdmin };

      } catch (err) {
        throw err;
      }
    },

    login: async (parent, { email, password }) => {
      const { valid, errors } = validate(email, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      };

      const user = await User.findOne({ email });
      if (!user) {
        throw new UserInputError('User does not exist!');
      };

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new UserInputError('Password is incorrect!');
      };

      const token = generateToken(user);
      return { id: user.id, email, token, isAdmin: user.isAdmin };
    }
  }
};