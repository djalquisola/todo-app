import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';
import { USER_TYPE } from '../constants/constants.js';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    // throw error
    throw new UnAuthenticatedError('Authentication Invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
      createdBy: payload.role === USER_TYPE.ADMIN ? {} : { createdBy: payload.userId },
    };
    next();
  } catch (err) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

export default auth;
