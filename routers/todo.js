import express from 'express';
import {
  createToDo,
  deleteToDo,
  getSingleToDo,
  getTodo,
  updateToDo,
  updateWholeToDo,
} from '../controller/todo.js';

const router = express.Router();

router.route('/').get(getTodo).post(createToDo);
router
  .route('/:id')
  .get(getSingleToDo)
  .patch(updateToDo)
  .put(updateWholeToDo)
  .delete(deleteToDo);

export default router;
