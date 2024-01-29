import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const singUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({
      message: 'Success',
      newUser,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
