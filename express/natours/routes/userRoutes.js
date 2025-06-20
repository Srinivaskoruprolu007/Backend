import express from 'express';
import {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { singup } from '../controllers/authController.js';

const userRouter = express.Router();


userRouter.post('/signup', singup);

userRouter.route('/').get(getAllUsers).post(addNewUser);

userRouter.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

export default userRouter;
