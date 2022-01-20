import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, model , SchemaTypes} = mongoose;
const { isEmail, isInt } = validator;

const residentSchema = new Schema({
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
  
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
    trim: true
  },
  phone: {
    type: Number,
    required: [true, 'Please enter a phone number'],
    unique: true,
    validate: [isInt, 'Please enter a valid phone number'],
    trim: true
  },
  
  password: {
    type: String,
    required: [true, 'Please enter a password']
  },
  residentType: {
    type: SchemaTypes.ObjectId,
    ref: 'residentType',
    required: true,
  },
  buildingNo : {
    
      type: SchemaTypes.ObjectId,
      ref: 'building',
      required: true,
      
    },
  

  residentCode :{
        type :  String,
        required: true,
  },
  
    Headuser: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
      
    
  },
  
},
  { timestamps: true }
);

export const Resident = model('resident', residentSchema);