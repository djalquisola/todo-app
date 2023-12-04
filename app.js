import express from 'express';
import { BASE_URL } from './constants/constants.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

//routes
import authRouter from './routers/auth.js';
import todoRouter from './routers/todo.js';

//auth middleware
import auth from './middlewares/authentication.js';

const app = express();

app.use(express.json());

app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/todo`, auth, todoRouter);

//fetching other requests
app.use('*', (req, res) => {
  res.status(404).json({
    msg: 'Not found.',
  });
});

app.use(errorHandlerMiddleware);

export default app;
