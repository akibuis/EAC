import { Router } from 'express';
import cors from 'cors';

router.route('/register')
    .post(UserController.register);
router.route('/login')
    .post(UserController.login);
router.route('/:id/verify/:token')
    .post(UserController.verifyUser)
    ;
router.route('/:id')
    .get([ authValidator, isVerified ], UserController.profile)
    .post(authValidator, upload.single('profileImg'), UserController.setProfileImage);
    ;

export default router;