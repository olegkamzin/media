import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import router from './routes/index.js'
import error from './middleware/error.js'
dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.dirname('static')))
app.use(fileUpload())
app.use(router)
app.use(error)

const start = async () => {
	try {
		app.listen(PORT, () => console.log(`✅ Сервер запущен на порту ${PORT}`))
	} catch(e) {
		console.log(e)
	}
}

start()