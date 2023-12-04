import mongoose from 'mongoose';
import { TODO_STATUS } from '../constants/constants.js';

/*
    ToDo

    _id
    title
    description
    status: pending, completed
    createdBy
    createdDate
    updatedDate

*/

const ToDoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
    },
    details: {
      type: String,
      required: [true, 'Please provide details'],
    },
    status: {
      type: String,
      enum: [TODO_STATUS.PENDING, TODO_STATUS.WORKING, TODO_STATUS.COMPLETED],
      default: TODO_STATUS.PENDING,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);


ToDoSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.isDeleted;
  return userObject;
};

const ToDo = mongoose.model('ToDo', ToDoSchema);

export default ToDo;
