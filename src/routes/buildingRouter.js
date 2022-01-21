import {Router} from 'express'
import BuildingController from '../controllers/BuildingController.js';

const router = Router();

router.route('/').get(BuildingController.getBuilding).post(BuildingController.createBuilding)
router.route('/:id').put(BuildingController.editBuilding)

export default router;