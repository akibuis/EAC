import express from 'express';
import userRouter from './userRouter.js';
import visitorTypeRouter from './visitorTypeRouter.js'
import residentTypeRouter from './residentTypeRouter.js'
import announcementRouter from './announcementRouter.js'
import buildingRouter from './buildingRouter.js'
import residentRouter from './residentRouter.js'
import visitorRouter from './visitorRouter.js'
import artisanRouter from './artisanRouter.js'
const router = express.Router();

router.use('/users', userRouter)
router.use('/visitorTypes', visitorTypeRouter)
router.use('/residentTypes', residentTypeRouter)
router.use('/resident', residentRouter)
router.use('/visitor', visitorRouter)
router.use('/artisan', artisanRouter)



router.use('/announcement', announcementRouter)
router.use('/building', buildingRouter)



export default router;