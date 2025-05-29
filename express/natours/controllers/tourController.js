const fs = require('fs');
const Tour = require('../models/tourModel.js');
const APIFeatures = require('../utils/apiFeatures.js');


// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// )


// const checkId = (req, res, next, val) => {
//     if (val * 1 > tours.length) {
//         return res.status(404).json({
//             status: 404,
//             message: "Invalid ID"
//         });
//     }
//     next();
// }

// const checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 400,
//             message: 'Name and price are required'
//         });
//     }
//     next();
// }


const getAllTours = async (req, res) => {
    try {
        
        // 1A) FILTERING
        // const queryObj = { ...req.query };
        // const excludedFields = ['page', 'sort', 'limit', 'fields'];
        // excludedFields.forEach(el => delete queryObj[el]);


        // // 1B) ADVANCED FILTERING
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    
        // // 2) MAKE QUERY
        // let query = Tour.find(JSON.parse(queryStr));


        // 3) SORTING
        // if(req.query.sort) {
        //     const sortBy = req.query.sort.split(',').join(' ');
        //     query = query.sort(sortBy);
        //     // sort('price ratingsAverage')
        // }
        // else {
        //     query = query.sort('-createdAt');
        // }

        // 4) FIELD LIMITING
        // if(req.query.fields) {
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select(fields);
        //     // select('name price')
        // }
        // else {
        //     query = query.select('-__v'); // Exclude __v field
        // }

        // 5) PAGINATION
        // const page = req.query.page * 1 || 1; // Convert to number
        // const limit = req.query.limit * 1 || 10; // Convert to number
        // const skip = (page - 1) * limit; // Calculate skip value
        // query = query.skip(skip).limit(limit);

        // if(req.query.page) {
        //     const numTours = await Tour.countDocuments();
        //     if(skip >= numTours) {
        //         throw new Error('This page does not exist');
        //     }
        // }
        // const { duration, difficulty } = req.query
        // const tours = await Tour.find()
        // .where('duration')
        // .equals(duration)
        // .where('difficulty')
        // .equals(difficulty)
        // filtering
        
        // 5) EXECUTE QUERY
        const features = new APIFeatures(Tour.find(), req.query).filter().sorting().fieldLimiting().pagination();
        const tours = await features.query;

        // 6) SEND RESPONSE
        res.status(200).json({
            status:'success',
            results:tours.length,
            requestedAt: req.requestedTime,
            data:{
                tours
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
        
    }
}

const topFiveCheapTours = async (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,difficulty,summary,ratingsAverage';
    next();
}

const getTourById = async  (req, res) => {
    const id = req.params.id;
    // const tour = tours.find(t => t.id === id);
    // if(tour){
    //     res.status(200).json({
    //         status:200, 
    //         data:{
    //             tour
    //         }
    //     })
    //     return;
    // }
    // res.status(404).json({
    //     status:400,
    //     message:"Resource is not found"
    // })
    try {
        const tour = await Tour.findById(id)
        if(!tour){
            return res.status(404).json({
                status: 404,
                message: "Resource is not found"
            })
        }
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
        
    }
}

const addNewTour = async (req, res) => {
    // // console.log(req.body)
    // const newId = tours[tours.length-1].id + 1;
    // const newTour = Object.assign({id: newId}, req.body)

    // tours.push(newTour)
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err => {
    //     res.status(201).json({
    //         status : 201,
    //         data: {
    //             tour:newTour
    //         }
    //     })
    // })
    // res.status(201).json({
    //     status : 201,
    //     data: {
    //         tour:newTour
    //     }
    // })

   try {
    const newTour =  await Tour.create(req.body)
    res.status(201).json({
          status: 'success',
          data: {
               tour: newTour
          }
    })
   } catch (error) {
       res.status(400).json({
           status: 'fail',
           message: error.message
       })
   }
}

const updateTour = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    
    // const tour = tours.find(t => t.id === id);
    // console.log(tour);
    
    // if(tour){
    //     const updatedTour = Object.assign(tour, req.body);
    //     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    //         res.status(200).json({
    //             status: 200,
    //             data: {
    //                 tour: updatedTour
    //             }
    //         });
    //     });
    //     return;
    // }
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});
        res.status(200).json({
            status: 'success',
            data: {
                tour: updatedTour
            }
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

const deleteTour = async (req, res) => {
    const id = req.params.id;
    // const tourIndex = tours.findIndex(t => t.id === id);
    
    // if(tourIndex !== -1) {
    //     tours.splice(tourIndex, 1);
    //     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    //         res.status(204).json({
    //             status: 204,
    //             data: null
    //         });
    //     });
    //     return;
    // }
    try {
        const tour = await Tour.findByIdAndDelete(id);
        if(!tour) {
            return res.status(404).json({
                status: 404,
                message: "Resource is not found"
            });
        }
        res.status(204).json({
            status: 204,
            data: null,
            message: "Tour deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
        
    }
}

module.exports = {
    getAllTours,
    getTourById,
    addNewTour,
    updateTour,
    deleteTour,
    topFiveCheapTours
}