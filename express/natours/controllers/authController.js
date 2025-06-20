import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';

const singup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
  next();
});
