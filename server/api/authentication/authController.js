import User from '../models/User.js';
import jwt from 'jsonwebtoken';

function errorHandler(err) {
  let errors = { username: '', email: '', password: '' };

  if (err.message === 'Incorrect email') {
    errors.email = 'That email is not registered';
  }
  
  if (err.message === 'Incorrect password') {
    errors.password = 'Password is incorrect';
  }

  if (err.code === 11000) {
    errors.email = 'Email is already in use';
    return errors;
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }

  return errors;
}

const MAX_AGE = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, 'ecommercewebapi', {
    expiresIn: MAX_AGE
  });
}

// export function signup_get(req, res) {
//   return;
// }

// export function login_get(req, res) {
//   return;
// }

export async function signup_post(req, res) {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      domain: 'localhost',
      httpOnly: true,
      maxAge: MAX_AGE * 1000
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
}

export async function login_post(req, res) {
  const payload = req.body;
  try {
    const user = await User.login(payload.login, payload.login_password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: MAX_AGE * 1000
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
}
