import express from 'express';
import fs from 'fs';
import {
  getAllTours,
  getTourById,
  addNewTour,
  updateTour,
  deleteTour,
  topFiveCheapTours,
  getTourStats,
  getMonthlyTours,
} from '../controllers/tourController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const tourRouter = express.Router();

// tourRouter.param('id',checkId);

// create a middleware to check the body
// if body contains the name and price properties
// If not, return a 400 status code with an error message

tourRouter.route('/tourStats').get(getTourStats);

tourRouter.route('/top-5-cheap').get(topFiveCheapTours, getAllTours);

tourRouter.route('/getMonthlyTours/:year').get(getMonthlyTours);

tourRouter.route('/').get(protect, getAllTours).post(addNewTour);

tourRouter
  .route('/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

export default tourRouter;
