import UserController from '../controller/user.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import bycrypt from 'bcrypt';

// validate register request
export const validateSignUp = async (req, re, next) => {
  const { name, email, password, mobileNumber: number } = req.body;
  console.log('req.body', req.body);
  try {
    if (!name || !email || !password || !number) {
      throw new Error(`data is insuffiecient to register`);
    }
    const user = await UserController.findOneByEmail(email);
    if (user) {
      throw new Error('Invalid request: userEmail is already in use');
    }
    const userWithNumber = await UserController.findOneByMobileNumber(number);
    if (userWithNumber) {
      throw new Error('Invalid request: mobileNumber is already in use');
    }
    req.body.password = await bycrypt.hash(password, 10);
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

// validate signIn request
export const validateSignIn = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserController.findOneByEmail(email);
    if (!user) {
      throw new Error('user with email is not regsiter');
    }
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

// authenticate protected routes
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  try {
    if (!token) {
      throw new Error('user authentication falied');
    }
    const decoded = jwt.verify(token, config.secretKey);
    const user = await UserController.findOneById(decoded.id);
    if (!user) {
      throw new Error('user doest not exist');
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
