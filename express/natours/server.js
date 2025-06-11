import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import app from './app.js';

const PORT = process.env.PORT;

const DB = process.env.CONNECTION_STRING;

mongoose.connect(DB).then((con) => {
  console.log(`DB connection successful to ${con.connections[0].name}`);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION!!! 💥 shutting downnn');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION!!! 💥 shutting downnn');
  server.close(() => {
    process.exit(1);
  });
})