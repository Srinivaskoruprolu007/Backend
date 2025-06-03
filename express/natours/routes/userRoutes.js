import express from 'express';
import fs from 'fs';
import {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(addNewUser);

userRouter.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

export default userRouter;
