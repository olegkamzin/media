import dotenv from 'dotenv'
import ApiError from '../service/error/ApiError.js'
dotenv.config()

export default function (req, res, next) {
	try {
		const key = req.headers.key
		if (key !== process.env.KEY) return next(ApiError.unauthorized('Вы не авторизованы...'))
		next()
	} catch (e) {
		next(ApiError.unauthorized('Вы не авторизованы.'))
	}
}