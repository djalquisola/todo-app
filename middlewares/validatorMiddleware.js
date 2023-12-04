import mongoose from 'mongoose';

import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import { TODO_STATUS } from '../constants/constants.js';
import ToDo from '../models/ToDo.js';

// custom middleware for validating the todo
export const validateIdParam = async (req, res, next) => {
  const { id: todoId } = req.params;
  const userId = req.user.userId;
  const isValidId = mongoose.Types.ObjectId.isValid(todoId);
  if (!isValidId) throw new BadRequestError('Invalid MongoDB ID');

  const todo = await ToDo.findOne({
    _id: todoId,
    createdBy: userId,
    isDeleted: false,
  });

  if (!todo) throw new NotFoundError(`No ToDo with id ${todoId}`);

  next();
};

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};

const isNotEmpty = (value) => {
  if (!value || Object.keys(value).length === 0) {
    throw new BadRequestError('Request body must not be empty');
  }
  return true;
};

// for post
export const validateToDoInput = withValidationErrors([
  body().custom(isNotEmpty),
  body('title')
    .notEmpty()
    .withMessage('Title must not be empty')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('details').notEmpty().withMessage('Details must not be empty'),
  body('status')
    .optional()
    .isIn(TODO_STATUS)
    .withMessage('Invalid status value'),
]);

// for patch
export const validateUpdatePatchToDo = withValidationErrors([
  body().custom(isNotEmpty),
  body('title')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('details').optional(),
  body('status')
    .optional()
    .isIn(TODO_STATUS)
    .withMessage('Invalid status value'),
]);

// for put
export const validateUpdatePutToDo = withValidationErrors([
  body().custom(isNotEmpty),
  body('title')
    .notEmpty()
    .withMessage('Title must not be empty')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('details').notEmpty().withMessage('Details must not be empty'),
  body('status')
    .notEmpty()
    .withMessage('Status must not be empty')
    .isIn(Object.values(TODO_STATUS))
    .withMessage('Invalid status value'),
]);
