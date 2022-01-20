import express from 'express';
import userRouter from './userRouter.js';
import visitorTypeRouter from './visitorTypeRouter.js'

const router = express.Router();

router.use('/users', userRouter)
router.use('/visitorTypes', visitorTypeRouter)

export default router;