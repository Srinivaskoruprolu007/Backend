import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';

export const singup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

export const login = catchAsync((req, res, next) => {
  const { email, password } = req.body;
  //   1. Check if email and password are exists
  if (!email || !password) {
    next(new AppError('Please provide email and password', 400));
  }

  //   2. check if user exists && password is correct

  //   3) If everything is okay, send token to client
  const token = '';
  res.status(200).json({
    status: 'success',
    token,
  });
});
