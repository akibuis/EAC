import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const buildingSchema = new Schema({
  buildingNo: {
    type: String,
    required: true,
    
  },
  streetName :{
      type : String,
      required: true,
  },
  numberOfFlats : {
      type:Number,
      required: true,
  }
},
  { timestamps: true }
);

export const Building = model('building', buildingSchema);