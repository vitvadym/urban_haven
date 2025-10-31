import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import ApiError from '../utils/ApiError.js';
import generatePassword from '../utils/generatePassword.js';
import createToken from '../utils/createToken.js';

const isProduction = process.env.NODE_ENV === 'production';

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return next(new ApiError('User already exists', 404));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    const token = createToken(user);
    await user.save();

    return res
      .status(201)
      .cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
      })
      .json(user);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (!existUser) {
      return next(new ApiError('User does not exist', 404));
    }
    const isPasswordValid = bcrypt.compareSync(password, existUser.password);

    if (!isPasswordValid) {
      return next(new ApiError('Incorrect password or login', 401));
    }

    const { password: pass, ...user } = existUser._doc;
    const token = createToken(existUser);

    return res
      .cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
      })
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
  }
};

export const googleSignIn = async (req, res, next) => {
  const { displayName, email, photoURL } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      const token = createToken(existUser);
      const { password, ...user } = existUser._doc;

      return res
        .cookie('token', token, { httpOnly: true })
        .status(200)
        .json(user);
    } else {
      const generatedPassword = generatePassword(12);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        email,
        username: displayName,
        password: hashedPassword,
        avatar: photoURL,
      });

      await newUser.save();
      const token = createToken(newUser);
      const { password, ...user } = newUser._doc;

      return res
        .cookie('token', token, { httpOnly: true })
        .status(200)
        .json(user);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Successfully signed out' });
  } catch (error) {
    next(error);
  }
};
