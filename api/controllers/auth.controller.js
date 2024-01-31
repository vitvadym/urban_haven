import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import ApiError from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ApiError('User does not exist', 404));
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return next(new ApiError('Incorrect password or login', 401));
    }

    const { password: pass, ...rest } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.cookie('token', token, { httpOnly: true }).status(200).json({
      message: 'Success',
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};
