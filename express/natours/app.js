const fs = require('fs')
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');





const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// 1) Middlewares



app.use(express.json())

app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    console.log('Request received at:', req.originalUrl);
    next();
})

app.use((req, res, next) => {
    req.requestedTime = new Date().toISOString();
    next();
})


// app.get('/', (req, res) => {
//     res.status(200).json({message:'Hello, World! from server side', app:"natours"});
// })

// app.post('/', (req, res) => {
//     res.status(200).json({message:'Hello, World! from server side post api', app:"natours"});
// })





// 2) Route Handlers




// 3) Routes
// app.get('/api/v1/tours', getAllTours)

// app.get('/api/v1/tours/:id',getTourById)

// app.post('/api/v1/tours',addNewTour)

// app.patch('/api/v1/tours/:id',updateTour)

// app.delete('/api/v1/tours/:id', deleteTour)

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);



// 4) Start the server
module.exports = app;

