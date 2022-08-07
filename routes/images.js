import Router from 'express'
import ImagesController from '../controllers/images.js'
import access from '../middleware/access.js'
const router = new Router()

router.post('/:slug/', access, ImagesController.upload)

export default router