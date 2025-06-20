import mongoose from 'mongoose';
import validator from 'validator';
// TODO : create a schema with name, email, photo, password, passwordConfirm

const userSChema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowecase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    require: [true, 'Please confrim your password'],
  },
});

const User = mongoose.model('User', userSChema);
export default User;
