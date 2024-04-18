const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @route POST api/user/login
 * @desc Login
 * @access Public
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in the required fields' });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '7d' }),
      });
    } else {
      return res.status(400).json({ message: 'Incorrect login or password entered' });
    }
  } catch (error) {
    console.error('Error during login', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @route POST api/user/register
 * @desc Register
 * @access Public
 */
const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json('Please fill in the required fieldss');
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (registeredUser) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '7d' }),
      });
    } else {
      return res.status(400).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    console.error('Error during register', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * @route GET api/user/current
 * @desc Current user
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  login,
  register,
  current,
};
