import mongoose from 'mongoose';

const { Schema, model , SchemaTypes} = mongoose;

const visitorSchema= new Schema({
  name: {
    type: String,
    required: true,
    
  },
  visitorCode :{
      type: String,
  },
  visitorType:{
      
        type: SchemaTypes.ObjectId,
        ref: 'visitorType',
        required: true,
        
      },
  
  timeIn : {
      type: Date
  },
  timeOut : {
      type: Date
  },
  profession :{
      type : String,
  },
  itemsInHand :{
    type : String,
  },
  status :{
      type : String,
      enum : ['Pending', 'Approve', 'Decline'],
      default: 'Pending',

  },
  phoneNumber : {
      type : Number,
      required: true,
  }

  
},
  { timestamps: true }
);

export const Visitor = model('visitor', visitorSchema);