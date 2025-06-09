import Tour from '../models/tourModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import catchAsync from '../utils/catchAsync.js';

// Controller for handling all tour-related operations

// Get all tours with filtering, sorting, field limiting, and pagination
const getAllTours = catchAsync(async (req, res) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sorting()
    .fieldLimiting()
    .pagination();
  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestedTime,
    data: { tours },
  });
});

// Middleware to set query parameters for top 5 cheap tours
const topFiveCheapTours = catchAsync(async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,difficulty,summary,ratingsAverage';
  next();
});

// Get a single tour by ID
const getTourById = catchAsync(async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 404,
      message: 'Resource is not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

// Add a new tour
const addNewTour = catchAsync(async (req, res) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { tour: newTour },
  });
});

// Update an existing tour by ID
const updateTour = catchAsync(async (req, res) => {
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedTour) {
    return res.status(404).json({
      status: 404,
      message: 'Resource is not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour: updatedTour },
  });
});

// Delete a tour by ID
const deleteTour = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 404,
      message: 'Resource is not found',
    });
  }
  res.status(204).json({
    status: 204,
    data: null,
    message: 'Tour deleted successfully',
  });
});

// Get tour statistics (e.g., average ratings, price range)
const getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { avgPrice: -1 } },
  ]);
  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});

// Get monthly tour plan for a specific year
const getMonthlyTours = catchAsync(async (req, res) => {
  const year = req.params.year * 1;
  const monthlyTours = await Tour.aggregate([
    { $unwind: '$startDates' },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numToursStart: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    { $addFields: { month: '$_id' } },
    { $project: { _id: 0 } },
    { $sort: { month: 1 } },
  ]);
  res.status(200).json({
    status: 'success',
    data: { monthlyTours },
  });
});

export {
  getAllTours,
  topFiveCheapTours,
  getTourById,
  addNewTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyTours,
};
