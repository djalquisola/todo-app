import { StatusCodes } from 'http-status-codes';
import ToDo from '../models/ToDo.js';
import NotFoundError from '../errors/not-found.js';

export const createToDo = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const todo = await ToDo.create(req.body);
  const finalTodo = todo.toJSON();

  res.status(StatusCodes.CREATED).json({
    finalTodo,
  });
};

export const getTodo = async (req, res) => {
  //queries
  const { createdBy } = req.user;
  const todos = await ToDo.find({ ...createdBy, isDeleted: false })
    .select('-isDeleted')
    .populate('createdBy', 'name');

  res.status(StatusCodes.OK).json({ todos });
};

export const getSingleToDo = async (req, res) => {
  const { id } = req.params;
  const { createdBy } = req.user;

  console.log(createdBy);

  const todo = await ToDo.findOne({
    _id: id,
    isDeleted: false,
    ...createdBy,
  })
    .select('-isDeleted')
    .populate('createdBy', 'name');

  res.status(StatusCodes.OK).json({
    todo,
  });
};

export const updateToDo = async (req, res) => {
  const {
    user: { createdBy },
    params: { id },
  } = req;

  const todo = await ToDo.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
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

  const removedToDo = await ToDo.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
      ...createdBy,
    },
    { isDeleted: true }
  );

  if (!removedToDo) {
    throw new NotFoundError(`No todo with id: ${id}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'ToDo deleted' });
};
