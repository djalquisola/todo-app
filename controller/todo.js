import { StatusCodes } from 'http-status-codes';
import { USER_TYPE } from '../constants/constants.js';
import ToDo from '../models/ToDo.js';

export const createToDo = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const todo = await ToDo.create(req.body);

  res.status(StatusCodes.CREATED).json({
    todo,
  });
};

export const getTodo = async (req, res) => {
  const filter =
    req.user.role === USER_TYPE.ADMIN ? {} : { createdBy: req.user.userId };
  const todos = await ToDo.find({ ...filter });

  res.status(StatusCodes.OK).json({ todos });
};

export const getSingleToDo = async (req, res) => {
  res.send('GET SINGLE TODO BY ID');
};

export const updateToDo = async (req, res) => {
  res.send('Update Single ToDo');
};

export const updateWholeToDo = async (req, res) => {
  res.send('Update whole object');
};

export const deleteToDo = async (req, res) => {
  res.send('Delete Todo');
};
