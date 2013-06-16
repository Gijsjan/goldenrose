define (require) ->
	config = require 'config'
	Base = require 'collections/base'
	Models =
		Document: require 'models/document'

	class Documents extends Base

		model: Models.Document
		
		url: -> '/mongo/db/'+config.current.database.id+'/coll/'+config.current.collection.id