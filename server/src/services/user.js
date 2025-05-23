import UserController from '../controller/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config.js';

export const signUpUser = async function (req, res, next) {
  const value = req.body;
  try {
    const user = await UserController.signUpUser(value);
    if (user) {
      const token = jwt.sign({ id: user.id }, config.secretKey, {
        expiresIn: config.jwtExpiration,
      });
      delete user.password;
      res.status(200).json({
        success: 1,
        user,
        token,
      });
    } else {
      res.status(409).send({ success: 0, message: 'Details are not correct' });
    }
  } catch (error) {
    error.status = 409;
    next(error);
  }
};

export const signInUser = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await UserController.findOneByEmail(email);
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        const token = jwt.sign({ id: user.id }, config.secretKey, {
          expiresIn: config.jwtExpiration,
        });
        delete user.password;
        res.status(200).json({
          success: 1,
          user,
          token,
        });
      } else {
        throw new Error('Authentication failed: user not found');
      }
    } else {
      throw new Error('Authentication failed: please check your password');
    }
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
