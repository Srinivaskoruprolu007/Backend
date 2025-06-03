import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import app from './app.js';

const PORT = process.env.PORT;

const DB = process.env.CONNECTION_STRING;

mongoose
  .connect(DB)
  .then((con) => {
    console.log(`DB connection successful to ${con.connections[0].name}`);
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
