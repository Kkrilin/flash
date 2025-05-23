import express from 'express';
import { validateSignIn, validateSignUp } from '../middleware/userAuth.js';
import {signUpUser, signInUser} from '../services/user.js';

const router = express();

router.post('/signup', validateSignUp, signUpUser);
router.post('/signin', validateSignIn, signInUser);


export default router