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
    type: SchemaTypes.ObjectId,
          ref: 'residentType',
          // required: true,
  },
  BuildingNo : {
    type: SchemaTypes.ObjectId,
    ref: 'buildingNo',
    // required: true,
  },
  role :{
    type: String,
    enum :['admin', 'head of house', 'security', 'resident']
  },

  ResidentCode :{
        
          type: SchemaTypes.ObjectId,
          ref: 'resident',
          // required: true,
          
        
  },
  Recommendation : {
    type: SchemaTypes.ObjectId,
          ref: 'recommendation',
          // required: true,

  }
  
},
  { timestamps: true }
);

export const User = model('user', userSchema);