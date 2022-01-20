import mongoose from 'mongoose';

const { Schema, model , SchemaTypes} = mongoose;

const artisanTimeSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
    
  },
  timeIn :{
      type: Date,
      required: true,
  },
  timeOut :{
      type: Date,
      required: true,
  }
},
  { timestamps: true }
);

export const ArtisanTime = model('artisanTime', artisanTimeSchema);