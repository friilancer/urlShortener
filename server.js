const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const Schema = require('./schema/schema');
const app = express();


const db = require('./configs/db');

db.authenticate()
	.then(() =>console.log('Connection has been established successfully.'))
	.catch(err => console.error('Unable to connect to the database:', error));


app.use('/graphql', graphqlHTTP({
	schema: Schema,
	graphiql: true
}))
app.use('/', require('./routes/redirect'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
