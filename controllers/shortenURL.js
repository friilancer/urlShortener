const {nanoid} = require('nanoid')

const createShortUri = async() => {
	let id = await nanoid(9)
	return id
}

module.exports = createShortUri;