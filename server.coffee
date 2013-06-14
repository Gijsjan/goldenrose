_ = require 'underscore'

express = require('express')
app = express()

app.use express.bodyParser()

MongoClient = require('mongodb').MongoClient
MongoServer = require('mongodb').Server
mongoServer = new MongoServer 'localhost', 27017
mongoClient = new MongoClient mongoServer

_writeResponse = (response, res) ->
	console.log '_writeResponse: no http code!' if not response.code?
	response.data = {} if not response.data?

	res.writeHead response.code, 'Content-Type': 'application/json; charset=UTF-8'
	res.end JSON.stringify(response.data)

app.get '/dbs', (req, res) ->
	MongoClient.connect "mongodb://localhost:27017/users", (err, db) ->
		adminDb = db.admin();

		adminDb.listDatabases (err, dbs) ->
			data =
				code: 200
				data: dbs

			console.log dbs

			_writeResponse data, res

app.get '/db/:db/colls/', (req, res) ->
	MongoClient.connect "mongodb://localhost:27017/"+req.params.db, (err, db) ->
		# db.collections (err, collections) ->
		db.collectionNames (err, collections) ->
			data = 
				code: 200
				data: collections
				# data: _.pluck(collections, 'collectionName')

			_writeResponse data, res

app.get '/db/:db/coll/:coll', (req, res) ->
	MongoClient.connect "mongodb://localhost:27017/"+req.params.db, (err, db) ->
		db.collection(req.params.coll).find({}).toArray (err, docs) ->
			data = 
				code: 200
				data: docs

			_writeResponse data, res
				

app.listen 3000
console.log 'Node server running on :3000'