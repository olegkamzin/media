import Router from 'express'
import ImagesController from '../controllers/images.js'
const router = new Router()

router.post('/:slug/', ImagesController.upload)

export default router