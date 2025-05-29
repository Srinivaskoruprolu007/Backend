const express = require('express');
const fs = require('fs');
const {
    getAllUsers,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser
} = require('../controllers/userController.js');

const userRouter = express.Router();




userRouter.route('/')
    .get(getAllUsers)
    .post(addNewUser);

userRouter.route('/:id')
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = userRouter;