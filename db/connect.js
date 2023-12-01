import { connect } from 'mongoose';

const connectDB = (url) => {
  return connect(url, {
    autoIndex: true,
  });
};

export default connectDB;
