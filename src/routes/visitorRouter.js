import {Router} from 'express'
import VisitorController from '../controllers/VisitorController.js'

const router = Router();

router.route('/').get(VisitorController.getVisitors).post(VisitorController.createVisitor)
router.route('/:id').put(VisitorController.editVisitor).delete()

export default router;