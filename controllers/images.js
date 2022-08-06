import ApiError from '../service/error/ApiError.js'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

class ImagesController {
	async upload(req, res, next) {
		// fs.mkdirSync('static/' + (new Date()).getFullYear())
		const { slug } = req.params
		const { img } = req.files
		if (Array.isArray(img)) {
			for (const el of img) {
				console.log(el)
				const name = uuidv4() + '.webp'
				sharp(el.data)
					.webp()
				// el.mv(path.resolve('static/' + el.name))
			}
		} else {
			const name = gen_name(12) + '.webp'
			console.log(name)
			sharp(img.data)
				.toFile('static/2022/' + name, (err, info) => { console.log(info) })
			sharp(img.data)
				.resize(300, 300, { fit: 'inside' })
				.toFile('static/2022/' + '300-' + name, (err, info) => { console.log(info) })
			res.json(name)
		}
	}
}

const gen_name = (len) => {
	const abc = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789'
	let str = ''
	for (let i = 0; i < len; i++) {
		const pos = Math.floor(Math.random() * abc.length)
		str += abc.substring(pos,pos+1)
	}
	return str
}

export default new ImagesController()