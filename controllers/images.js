import ApiError from '../service/error/ApiError.js'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

class ImagesController {
	async upload(req, res, next) {
		const { img } = req.files
		const sizes = [200, 400, 800, null]
		const dir = genName(2) + '/'
		const result = []
		if (Array.isArray(img)) {
			for (const el of img) {
				const name = dir + genName(16) + '.webp'
				for (let i = 0; i < sizes.length; i++) {
					const sizeDir = 'static/' + sizes[i] + '/'
					if (!fs.existsSync(sizeDir)) fs.mkdirSync(sizeDir)
					const imgDir = sizeDir + dir
					if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir)
					sharp(el.data)
						.resize(sizes[i], sizes[i], { fit: 'inside' })
						.toFile(sizeDir + name)
				}
				result.push(name)
			}
		} else {
			const name = dir + genName(16) + '.webp'
			for (let i = 0; i < sizes.length; i++) {
				const sizeDir = 'static/' + sizes[i] + '/'
				if (!fs.existsSync(sizeDir)) fs.mkdirSync(sizeDir)
				const imgDir = sizeDir + dir
				if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir)
				sharp(img.data)
					.resize(sizes[i], sizes[i], { fit: 'inside' })
					.toFile(sizeDir + name)
			}
			result.push(name)
	
		}
		res.json(result)
	}
}

const genName = (len) => {
	const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
	let str = ''
	for (let i = 0; i < len; i++) {
		const pos = Math.floor(Math.random() * abc.length)
		str += abc.substring(pos,pos+1)
	}
	return str
}

export default new ImagesController()