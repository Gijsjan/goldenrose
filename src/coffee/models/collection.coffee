define (require) ->

	config = require 'config'

	BaseModel = require 'models/base'

	class Collection extends BaseModel

		url: -> '/mongo/db/'+config.current.database.id+'/colls'