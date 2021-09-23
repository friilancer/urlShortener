const express = require('express');
const Router = express.Router();
const Uri = require('../model/uris');

Router.get('/:code', async (req, res) => {
	const code = req.params.code;

	const link = await Uri.findOne({
		where : {
			shortened_uri : code
		}
	})

	if (link === null) {
		return res.status(400).json({
			message: "Uri does not exist"
		});
	} else {
		return res.redirect(link.dataValues.uri);
	}
});

module.exports = Router;