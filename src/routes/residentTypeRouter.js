import {Router} from 'express'

import ResidentTypeController from '../controllers/ResidentTypeController.js'

const router = Router();

router.route('/').get(ResidentTypeController.getResidentType).post(ResidentTypeController.createResidentType)
router.route('/:id').put(ResidentTypeController.editResidentType)

export default router;