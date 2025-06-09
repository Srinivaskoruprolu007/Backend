# Natours Project Documentation

## Overview

The Natours project is a backend application built with Node.js, Express, and MongoDB. It provides APIs for managing tours, users, and related data.

## Project Structure

```
express/
  natours/
    app.js          # Main application file
    server.js       # Server entry point
    controllers/    # Contains all controller logic
    dev-data/       # Sample data for development
    models/         # Mongoose models
    public/         # Static files
    routes/         # API route definitions
    utils/          # Utility functions
```

## API Endpoints

### Tours

- **GET /api/v1/tours**: Get all tours with filtering, sorting, and pagination.
- **GET /api/v1/tours/:id**: Get a single tour by ID.
- **POST /api/v1/tours**: Create a new tour.
- **PATCH /api/v1/tours/:id**: Update an existing tour.
- **DELETE /api/v1/tours/:id**: Delete a tour.

### Users

- **GET /api/v1/users**: Get all users.
- **GET /api/v1/users/:id**: Get a single user by ID.
- **POST /api/v1/users**: Create a new user.
- **PATCH /api/v1/users/:id**: Update an existing user.
- **DELETE /api/v1/users/:id**: Delete a user.

## Middleware

- **Logging**: Logs requests in development mode using `morgan`.
- **JSON Parsing**: Parses incoming JSON requests.
- **Static Files**: Serves static files from the `public` directory.

## Utilities

- **apiFeatures.js**: Handles filtering, sorting, field limiting, and pagination for API queries.
- **appError.js**: Custom error handling class.
- **catchAsync.js**: Utility to handle async errors in controllers.

## Development

### Running the Application

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=development
PORT=3000
DATABASE=<your-database-connection-string>
```

## License

This project is licensed under the ISC License.
