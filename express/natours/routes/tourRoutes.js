const express = require('express');
const fs = require('fs');
const {
    getAllTours,
    getTourById,
    addNewTour,
    updateTour,
    deleteTour,
} = require('../controllers/tourController.js');


const tourRouter = express.Router();

// tourRouter.param('id',checkId);

// create a middleware to check the body
// if body contains the name and price properties
// If not, return a 400 status code with an error message



tourRouter.route('/')
    .get(getAllTours)
    .post( addNewTour);

tourRouter.route('/:id')
    .get(getTourById)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = tourRouter;