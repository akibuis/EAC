import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';



import { User } from '../models/User.js';
// import MailService from '../services/MailService.js';

dotenv.config();

const UserController = {
  // generateSha256Hash: async (userEmail) => {
  //   const sha256Hash = crypto.createHash('sha256');
  //   const r = (Math.random() + 1).toString(36).substring(2);

  //   const data = sha256Hash.update(userEmail + r, 'utf-8');
  //   const gen_hash = data.digest('hex');
    
  //   return gen_hash;
  // },
  
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

  // verifyUser: async (req, res) => {
  //   const { id, token } = req.params;
  //   const user = await User.findById(id).select(["-password", "-email", "-phone", "-role"]);
    

  //   if(!user) {
  //     return res.status(404).json({ 
  //       status: "failed", 
  //       message: "user not found" 
  //     });
  //   }
    
  //   if(user.isVerified) {
  //     return res.status(410).json({ 
  //       status: "failed", 
  //       message: "invalid token: user is already verified" 
  //     });
  //   }
  //   if(!token || token !== user.accountVerifyToken  /* || accountVerifyTokenExpiration isExpired */) {
  //     return res.status(405).json({ 
  //       status: "failed", 
  //       message: "invalid verification token" 
  //     });
  //   }

  //   try {
  //     if (token === user.accountVerifyToken) {
        
  //       user.isVerified = true;
  //       user.accountVerifyToken = '';
  //       user.accountVerifyTokenExpiration = '';
  //       user.save();

  //       return res.status(200).json({
  //         status: 'success',
  //         message: "successful verification", 
  //         data: {
  //           _id: user._id, 
  //           firstname: user.firstname, 
  //           lastname: user.lastname, 
  //           username: user.username, 
  //           isVerified: user.isVerified,
  //           verifyToken: user.accountVerifyToken,
  //           verifyTokenExpiration: user.accountVerifyTokenExpiration
  //         }
  //       })
  //     }

  //     return res.status(405).json({ 
  //       status: "failed", 
  //       message: "verification not successful" 
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ 
  //       status: "failed", 
  //       message: error.message 
  //     });
  //   }
  // },

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
    const { id } = req.params;
    
    try {
      const user = await User.findById(id).select("-password");

      if(!user) return res.status(404).json({
        status: 'failed',
        message: 'user not found'
      })

      if (id === req.user.id) {
        return res.status(200).json({
          status: 'success',
          message: 'successful',
          data: user
        });
      }

      return res.status(401).json({
        status: 'failed',
        message: 'only personal profile access allowed',
      });
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
  }
}

export default UserController;