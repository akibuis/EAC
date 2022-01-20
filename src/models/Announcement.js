import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const announcementSchema = new Schema({
  title: {
    type: String,
    required: true,
    
  },
  message:{
      type : String,
      required: true,
  },
  
},
  { timestamps: true }
);

export const Announcement = model('announcement', announcementSchema);