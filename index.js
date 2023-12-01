import 'express-async-errors';

import * as dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './db/connect.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
