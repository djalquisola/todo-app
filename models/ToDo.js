import mongoose from 'mongoose';

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
      enum: ['pending', 'working', 'completed'],
      default: 'pending',
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

const ToDo = mongoose.model('ToDo', ToDoSchema);

export default ToDo;
