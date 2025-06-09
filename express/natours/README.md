# Natours Backend API Documentation

## Overview

This project is a backend API for managing tours, users, and bookings for the Natours application. It is built using Node.js, Express, and MongoDB.

## Features

- CRUD operations for tours
- Filtering, sorting, and pagination for tour listings
- User authentication and authorization
- Tour statistics and monthly plans

## Endpoints

### Tours

- `GET /api/v1/tours` - Get all tours with filtering, sorting, and pagination
- `GET /api/v1/tours/:id` - Get a single tour by ID
- `POST /api/v1/tours` - Add a new tour
- `PATCH /api/v1/tours/:id` - Update a tour by ID
- `DELETE /api/v1/tours/:id` - Delete a tour by ID
- `GET /api/v1/tours/tourStats` - Get tour statistics
- `GET /api/v1/tours/getMonthlyTours/:year` - Get monthly tour plans for a specific year

### Users

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get a single user by ID
- `POST /api/v1/users` - Add a new user
- `PATCH /api/v1/users/:id` - Update a user by ID
- `DELETE /api/v1/users/:id` - Delete a user by ID

## Setup

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```env
   CONNECTION_STRING=<your-mongodb-connection-string>
   NODE_ENV=development
   PORT=5000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv

## Folder Structure

``
express/
  natours/
    app.js
    server.js
    controllers/
    models/
    routes/
    utils/
    public/
    dev-data/
``

## License

This project is licensed under the MIT License.
