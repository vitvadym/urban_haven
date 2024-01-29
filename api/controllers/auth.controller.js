import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import ApiError from '../utils/ApiError.js';

export const singUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return next(new ApiError('User already exists', 404));
    }

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
    next(error);
  }
};
