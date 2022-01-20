import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const residentTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    
  },
},
  { timestamps: true }
);

export const ResidentType = model('residentType', residentTypeSchema);