import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import catchAsync from '../utils/catchAsync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`),
);



// Apply catchAsync to all methods for consistent error handling
const getAllUsers = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

const getUserById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u._id === id);
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'User is not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

const addNewUser = catchAsync(async (req, res) => {
  const newId = (Math.random() + 1).toString(36).substring(2, 10);
  const newUser = Object.assign({ _id: newId }, req.body);
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 201,
        data: { user: newUser },
      });
    },
  );
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({
      status: 400,
      message: 'User is not found',
    });
  }
  const updatedUser = Object.assign(user, req.body);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(200).json({
        status: 200,
        data: { user: updatedUser },
      });
    },
  );
});

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({
      status: 400,
      message: 'User is not found',
    });
  }
  users.splice(userIndex, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(204).json({
        status: 204,
        data: null,
      });
    },
  );
});

export { getAllUsers, getUserById, addNewUser, updateUser, deleteUser };
