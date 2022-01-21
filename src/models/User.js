import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, model, SchemaTypes } = mongoose;
const { isEmail, isInt } = validator;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please enter a phone number'],
    unique: true,
    validate: [isInt, 'Please enter a valid phone number'],
    trim: true
  },
  
  password: {
    type: String,
    required: [true, 'Please enter a password']
  },
  ResidentType: {
    type: String,
    enum: ['Head of House', 'Temporary', 'Others'],
    default: 'Head of House'
  },
  BuildingNo : {
        type: Number,
  },

  ResidentCode :{
        
          type: SchemaTypes.ObjectId,
          ref: 'resident',
          // required: true,
          
        
  },
  Recommendation : {
    type: String,

  }
  
},
  { timestamps: true }
);

export const User = model('user', userSchema);