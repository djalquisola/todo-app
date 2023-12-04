import User from '../models/User.js';
import { USER_TYPE } from '../constants/constants.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new UnAuthenticatedError('Invalid credentials');
  }

  const isPasswordVerified = await user.comparePassword(password);

  if (!isPasswordVerified) {
    throw new UnAuthenticatedError('Invalid credentials');
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: user.name,
    token,
  });
};

export const register = async (req, res) => {
  //Set the user as an admin if first created
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? USER_TYPE.ADMIN : USER_TYPE.USER;

  const user = await User.create(req.body);
  const token = user.createJWT();
  return res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token });
};
