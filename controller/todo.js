import { StatusCodes } from 'http-status-codes';
import { USER_TYPE } from '../constants/constants.js';
import ToDo from '../models/ToDo.js';
import BadRequestError from '../errors/bad-request.js';

export const createToDo = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const todo = await ToDo.create(req.body);

  res.status(StatusCodes.CREATED).json({
    todo,
  });
};

export const getTodo = async (req, res) => {
  //queries

  const filter =
    req.user.role === USER_TYPE.ADMIN ? {} : { createdBy: req.user.userId };
  const todos = await ToDo.find({ ...filter });

  res.status(StatusCodes.OK).json({ todos });
};

export const getSingleToDo = async (req, res) => {
  const { id } = req.params;

  const todo = await ToDo.findById(id);

  res.status(StatusCodes.OK).json({
    todo,
  });
};

export const updateToDo = async (req, res) => {
  const {
    body: { title, details },
    user: { userId },
    params: { id },
  } = req;

  // if (title === '' && details === '') {
  //   throw new BadRequestError("Title and Details can't be empty");
  // }

  const todo = await ToDo.findByIdAndUpdate(
    {
      _id: id,
      createdBy: userId,
    },
    req.body,
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    todo,
  });
};

export const deleteToDo = async (req, res) => {
  res.send('Delete Todo');
};
