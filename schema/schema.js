const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLSchema
} = require('graphql');

const createShortUri = require('../controllers/shortenURL');

const Uri = require('../model/uris');

const URIType = new GraphQLObjectType({
	name: 'Uri',
	description: 'This represents a URI',
	fields(){
		return {
			id: {
				type: GraphQLNonNull(GraphQLInt),
				resolve(uri){
					return uri.id;
				}
			},
			uri: {
				type: GraphQLNonNull(GraphQLString),
				resolve(uri){
					return uri.uri;
				}
			},
			shortened_uri: {
				type: GraphQLNonNull(GraphQLString),
				resolve(uri){
					return uri.shortened_uri;
				}
			},
			times_visited: {
				type: GraphQLNonNull(GraphQLString),
				resolve(uri){
					return uri.times_visited;
				}
			}
		}
	}
})

const Query = new GraphQLObjectType({
	name: 'Query',
	description: 'This is the root query',
	fields(){
		return {
			uris: {
				type: new GraphQLList(URIType),
				args: {
					id: {
						type: GraphQLInt
					}
				},
				resolve(parent, args) {
					return Uri.findAll({where: args})
				}
			}
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Functions to mutate database',
	fields(){
		return {
			shortenURL : {
				type: URIType,
				args: {
					uri: {
						type: new GraphQLNonNull(GraphQLString)
					}
				},
				resolve: async(parent, args) => {
					let shortened_uri =  await createShortUri();
					return Uri.create({
						uri : args.uri,
						shortened_uri						
					})
				}
			}
		}
	}
})
const Schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
})

module.exports = Schema;
