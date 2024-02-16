import bcrypt from 'bcrypt';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.model.js';

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return next(new ApiError('User not found', 404));
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { username, email, avatar, password } = req.body;
    const existUser = await User.findById(req.params.id);

    if (!existUser) {
      return next(new ApiError('User not found', 404));
    }

    let hashedPassword;

    if (password) {
      hashedPassword = bcrypt.hashSync(password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username,
          email,
          avatar,
          password: hashedPassword,
        },
      },
      {
        new: true,
      },
    );

    const { password: pass, ...user } = updatedUser._doc;
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const existUser = await User.findById(req.params.id);
    if (!existUser) {
      return next(new ApiError('User not found', 404));
    }
    await User.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .clearCookie('token')
      .json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};
