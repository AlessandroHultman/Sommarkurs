import User from '../models/User.js';

function errorHandler(err) {
  let errors = { username: '', email: '', password: '' };

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
    res.status(201).json(user);
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
}

// export async function login_post(req, res) {
//   return;
// }
