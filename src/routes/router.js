import express from 'express';
import userRouter from './userRouter.js';
import visitorTypeRouter from './visitorTypeRouter.js'
import residentTypeRouter from './residentTypeRouter.js'

const router = express.Router();

router.use('/users', userRouter)
router.use('/visitorTypes', visitorTypeRouter)
router.use('/residentTypes', residentTypeRouter)

export default router;