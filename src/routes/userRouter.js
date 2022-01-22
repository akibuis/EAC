import { Router } from 'express';
import cors from 'cors';
import UserController from "../controllers/UserController.js"

const router = Router();

router.route('/register')
    .post(UserController.register);
router.route('/login')
    .post(UserController.login);
    router.route('/').get(UserController.getUsers)
// router.route('/:id/verify/:token')
//     .post(UserController.verifyUser)
//     ;
router.route('/:id')
    .get( UserController.profile)
    .post( UserController.setProfileImage);
    ;

export default router;