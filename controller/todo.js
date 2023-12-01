import { StatusCodes } from 'http-status-codes';
import ToDo from '../models/ToDo.js';
import NotFoundError from '../errors/not-found.js';

export const createToDo = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const todo = await ToDo.create(req.body);

  res.status(StatusCodes.CREATED).json({
    todo,
  });
};

export const getTodo = async (req, res) => {
  //queries
  const { createdBy } = req.user;
  const todos = await ToDo.find({ ...createdBy });

  res.status(StatusCodes.OK).json({ todos });
};

export const getSingleToDo = async (req, res) => {
  const { id } = req.params;
  const { createdBy } = req.user;

  const todo = await ToDo.findOne({
    _id: id,
    ...createdBy,
  });

  res.status(StatusCodes.OK).json({
    todo,
  });
};

export const updateToDo = async (req, res) => {
  const {
    user: { createdBy },
    params: { id },
  } = req;

  const todo = await ToDo.findByIdAndUpdate(
    {
      _id: id,
      ...createdBy,
    },
    req.body,
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    todo,
  });
};

export const deleteToDo = async (req, res) => {
  const {
    user: { createdBy },
    params: { id: id },
  } = req;

  const removedToDo = await ToDo.findOneAndDelete({
    _id: id,
    ...createdBy,
  });

  if (!removedToDo) {
    throw new NotFoundError(`No job with id: ${id}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'job deleted' });
};
