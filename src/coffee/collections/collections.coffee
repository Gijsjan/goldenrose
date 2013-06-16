define (require) ->
	config = require 'config'
	Base = require 'collections/base'

	Models =
		Collection: require 'models/collection'

	class Collections extends Base

		model: Models.Collection
		
		url: -> '/mongo/db/'+config.current.database.id+'/colls'
