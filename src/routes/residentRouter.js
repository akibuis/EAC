import {Router} from 'express'
import ResidentController from '../controllers/ResidentController.js'

const router = Router();

router.route('/').get(ResidentController.getResidents).post(ResidentController.createResident)
router.route('/:id').put(ResidentController.editResident).delete()

export default router;