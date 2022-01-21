import {Router} from 'express'
import AnnouncementController from '../controllers/AnnouncementController.js'

const router = Router();

router.route('/').get(AnnouncementController.getAnnouncement).post(AnnouncementController.createAnnouncement)
router.route('/:id').put(AnnouncementController.editAnnouncement).delete()

export default router;