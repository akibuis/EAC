import {Router} from 'express'

import VisitorTypeController from '../controllers/VisitorTypeController.js'

const router = Router();

router.route('/').get(VisitorTypeController.getVisitorType).post(VisitorTypeController.createVisitorType)
router.route('/:id').put(VisitorTypeController.editVisitorType).delete(VisitorTypeController.removeVisitorTypes)

export default router;