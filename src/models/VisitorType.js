import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const VisitorTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    
  },
},
  { timestamps: true }
);

export const VisitorType = model('visitorType', VisitorTypeSchema);