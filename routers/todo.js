import express from 'express';
import {
  createToDo,
  deleteToDo,
  getSingleToDo,
  getTodo,
  updateToDo,
} from '../controller/todo.js';

//validators
import {
  validateIdParam,
  validateToDoInput,
  validateUpdatePatchToDo,
  validateUpdatePutToDo,
} from '../middlewares/validatorMiddleware.js';

const router = express.Router();

router.route('/').get(getTodo).post(validateToDoInput, createToDo);
router
  .route('/:id')
  .get(validateIdParam, getSingleToDo)
  .patch(validateUpdatePatchToDo, updateToDo)
  .put(validateUpdatePutToDo, updateToDo)
  .delete(validateIdParam, deleteToDo);

export default router;
