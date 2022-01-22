import {Router} from 'express'
import ArtisanTimeController from '../controllers/ArtisanTimeController.js'

const router = Router();

router.route('/').get(ArtisanTimeController.getArtisanTime).post(ArtisanTimeController.createArtisanTime)
router.route('/:id').put(ArtisanTimeController.editArtisanTime).delete()

export default router;