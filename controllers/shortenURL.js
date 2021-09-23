const Uri = require('../model/uris');

const generateShortUri = () => {
	const arr = [];

	for(let i=0; i < 6 ; i++){
		let str = Math.floor(Math.random() * 26 ) + 97;
		arr.push(String.fromCharCode(str)); 
	}

	return arr.join(''); 
}

const createShortUri = async() => {
	let shortened_uri = generateShortUri();
	const link = await Uri.findOne({
		where : {
			shortened_uri
		}
	})

	console.log(shortened_uri);

	return link == null ? shortened_uri : createShortUri() ;
}

module.exports = createShortUri;