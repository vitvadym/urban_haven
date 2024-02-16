import jwt from 'jsonwebtoken';
import ApiError from './ApiError.js';

const checkAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ApiError('Unauthorized', 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      next(new ApiError('Forbidden', 403));
    }

    req.userId = decoded.id;
    next();
  });
};

export default checkAuth;
