import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = 'mongodb+srv://amazing:amazing@cluster0.51ryp.mongodb.net/Eac?retryWrites=true&w=majority';
const dbConnection = {
  getConnect: async () => {
     
    try {
      
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

      })
      ;
      console.log('DB connection successful');

    } catch(err) {
      console.error(err.message);
      process.exit(1);
    }
  }
};

export default dbConnection;
