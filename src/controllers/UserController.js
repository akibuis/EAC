import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';



import { User } from '../models/User.js';
// import MailService from '../services/MailService.js';

dotenv.config();

const UserController = {
  
  
  register: async (req, res) => {
    const reqBody = req.body;
    const { username, firstname, lastname, email, phone, password, confirmPassword, role, buildingNo } = req.body;
    const reqFields = ['username', 'firstname', 'lastname', 'email', 'phone', 'password', 'confirmPassword', 'role', 'buildingNo'];

    try {
      if(password !== confirmPassword) {
        return res
          .status(400)
          .json({ status: 'failed', message: 'Passwords do not match' });
      }

      // find if email or username already exists
      const isUserExist = await User.findOne({ 
        $or: [{ username }, { email }] 
      });

      if(isUserExist) {
        return res
          .status(400).json({ 
            status: 'failed', 
            message: `username '${username}' or email '${email}' already taken`
          });
      }

      for (const field of reqFields) {
        if (!reqBody[field] ) {
          return res
            .status(400).json({ 
              status: 'failed', 
              message: `${field} field is required` 
            });
        }
      }

      if (!firstname || !lastname || !username || !email || !phone || !password || !confirmPassword || !role ||!buildingNo) {
        return res
          .status(400).json({ 
            status: 'failed', 
            message: 'please fill all required fields for estate access' 
          });
      }
      const newUser = new User({ firstname, lastname, username, email, phone, buildingNo, role, password });
        const savedUser = await newUser.save();
    
        jwt.sign(
          { id: savedUser._id },
          'Secret',
          { expiresIn: +3600},
          (err, token) => {
            if (err) {
              throw err;
            }
            if(savedUser) {
              res.status(200).json({ 
                status: 'success',
                data: {
                  id: savedUser._id,
                  firstname: savedUser.firstname,
                  lastname: savedUser.lastname,
                  username: savedUser.username,
                  email: savedUser.email,
                  phone: savedUser.phone,
                  role: savedUser.role,
                  token: "Bearer " + token
                
                },
                message: 'user registration successful'
              });
            }
             
            
          }
        );

        // if(savedUser) {
        //   res.status(200).json({ 
        //     status: 'success',
        //     data: {
        //       id: savedUser._id,
        //       firstname: savedUser.firstname,
        //       lastname: savedUser.lastname,
        //       username: savedUser.username,
        //       email: savedUser.email,
        //       phone: savedUser.phone,
        //       role: savedUser.role,
        //       verifyToken: savedUser.accountVerifyToken,
            
        //     },
        //     message: 'user registration successful'
        //   });
        // }
         
         
        
      
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        error : error
      })
    }
  },

  signUpSecurity: async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Please fill all fields' });
    }

    if(password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Passwords do not match' });
    }

    //find if email already exist
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'User already exists' });
    }

    // password hash
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    
      const newUser = new User({ firstname, lastname, email, password, role: "admin" });
      const savedUser = await newUser.save();

      if(savedUser) {
        jwt.sign(
          { id: savedUser._id },
          process.env.SECRET,
          { expiresIn: +process.env.JWT_EXPIRY },
          (err, token) => {
            if (err) {
              throw err;
            }

            res.status(200).json({
              status: 'success',
              data: {
                token: "Bearer " + token,
                id: savedUser._id,
                firstname: savedUser.firstname,
                lastname: savedUser.lastname,
                email: savedUser.email,
              },
              message: 'successful',
            });
          }
        );
      }
    
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Provide email and password' });
    }

    const isUser = await User.findOne({ email });

    if (!isUser) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'record not found' });
    }

    //validate user password
    

    
    

    jwt.sign(
        { id: isUser._id },
        'Secret',
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }

          return res.status(200).json({
            status: 'success',
            data: {
              token:"Bearer " + token,
              id: isUser._id,
              name: isUser.name,
              email: isUser.email,
            },
            message: 'successful',
          });
        }
      );    
  },

  profile: async (req, res) => {
    const { id } = req.params.id;
    
    try { 
      const user = await User.findById(req.params.id)
      

      if(user) return res.status(404).json({
        status: 'success',
        message: 'user retrieved successfully',
        data:user
      })
      console.log(req.params.id)


      
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        error: error.message
      })
    }
  },

  setProfileImage: async (req, res) => {
    const { id } = req.params;
    
    if(!req.file) {
      return res.status(400).json({
        status: "Failed",
        message: "Please select an image to upload"
      })
    }

    try {
      const data = await User.findByIdAndUpdate(
        { _id: id },
        { profileImg: req.file.path },
        { new: true }
      );

      return res.status(200).json({
        data,
        status: "Success",
        message: "Profile picture uploaded successfully!"
      })
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message
      })  
    }
  },
  getUsers : async(req, res) =>{
    try{
        const Users = await User.find({}).lean().exec();
        return res 
        .status(201)
        .json({status:'success', message: 'Successful', data: Users})
    }catch(err) {
        return res.status(500).json({status:'fail', message:'server err', err})
    }
},
}

export default UserController;