import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const recommendationSchema = new Schema({
  artisanNo: {
    type: Number,
    required: true,
    
  },
 artisanName :{
      type : String,
      required: true,
  },
  artisanProfession : {
      type : String,
      required: true,
  },
  recommendToName: {
      type:String,
      required: true,
  },
  recommendToPhoneNo: {
    type:Name,
    required: true,
},
},
  { timestamps: true }
);

export const Recommendation = model('recommendation', recommendationSchema);