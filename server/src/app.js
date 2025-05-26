import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { pool } from './model/index.js';

const app = express();
const port = 3000;

// meddileWare
import errorHandler from './middleware/errorHandler.js';
import { authenticate } from './middleware/userAuth.js';

// routes import
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js'
import activityRouter from './routes/activity.js'

// Middleware to log requests
app.use((req, res, next) => {
  console.info(`Logger initialized successfully ${req.method} ${req.url}`);
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/running', (req, res) => {
  res.status(200).json({ success: 1 });
});

//  routes
app.use('/auth', authRouter);
app.use('/api', authenticate);
app.use('/api/users', userRouter);
app.use('/api/activities', activityRouter);

app.use((req, res, next) => {
  const errorMessage = `Route not found: ${req.method} ${req.originalUrl}`;
  console.warn(errorMessage);
  res.status(404).json({
    error: 'Route not found',
    message: errorMessage,
  });
});


app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
