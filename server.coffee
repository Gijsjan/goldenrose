_ = require 'underscore'

express = require('express')
app = express()

app.use express.bodyParser()

app.use express.static(__dirname + '/dev')

# MongoClient = require('mongodb').MongoClient
# MongoServer = require('mongodb').Server
# mongoServer = new MongoServer 'localhost', 27017
# mongoClient = new MongoClient mongoServer

Db = require('mongodb').Db
Server = require('mongodb').Server

_mongo = (dbName, cb) ->
	db = new Db dbName, new Server('localhost', 27017), safe: false
	db.open cb

_writeResponse = (response, res) ->
	console.log '_writeResponse: no http code!' if not response.code?
	response.data = {} if not response.data?

	res.writeHead response.code, 'Content-Type': 'application/json; charset=UTF-8'
	res.end JSON.stringify(response.data)

# app.post '/mongo/db/:db/add', (req, res) ->
# 	_mongo req.params.db, (err, db) ->
# 		db.createCollection req.body.collName, {}, (err, collection) ->
# 			# TODO: if (err)
# 			data =
# 				code: 200
# 				data: req.body.collName

# 			_writeResponse data, res

app.post '/mongo/db/:db/coll/:coll/add', (req, res) ->
	json = JSON.parse(req.body.json)
	_mongo req.params.db, (err, db) ->
		db.collection(req.params.coll).insert json, (err, result) ->
			# TODO: if (err)
			data =
				code: 200
				data: result[0]

			_writeResponse data, res

app.get '/mongo/dbs', (req, res) ->
	_mongo 'local', (err, db) ->
		adminDb = db.admin();

		adminDb.listDatabases (err, dbs) ->
			data =
				code: 200
				data: dbs

			_writeResponse data, res

			db.close()

app.get '/mongo/db/:db/colls', (req, res) ->
	_mongo req.params.db, (err, db) ->
		db.collectionNames (err, collections) ->
			collections = _.map collections, (coll) -> name: coll.name.substr(coll.name.indexOf('.') + 1)

			data = 
				code: 200
				data: collections

			_writeResponse data, res

app.post '/mongo/db/:db/colls', (req, res) ->
	_mongo req.params.db, (err, db) ->
		console.log req.body
		db.createCollection req.body.name, {}, (err, collection) ->
			# TODO: if (err)
			data =
				code: 200
				data: req.body.name

			_writeResponse data, res

app.get '/mongo/db/:db/coll/:coll', (req, res) ->
	_mongo req.params.db, (err, db) ->
		db.collection(req.params.coll).find({}).toArray (err, docs) ->
			data = 
				code: 200
				data: docs

			_writeResponse data, res
				

app.listen 3000, 'localhost'
console.log 'Node server running on http://localhost:3000'