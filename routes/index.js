import Router from 'express'
const router = new Router()
import images from './images.js'

router.use('/image/', images)

export default router