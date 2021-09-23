const {Sequelize, DataTypes} = require('sequelize');
const db = require('../configs/db');

const Uri = db.define('Uri', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	uri: {
		type: DataTypes.STRING,
		allowNull: false
	},
	shortened_uri: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	times_visited: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}
},{
	tableName: 'uris',
	timestamps: false
})

Uri.sync();
module.exports = Uri;