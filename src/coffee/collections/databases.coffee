define (require) ->
	Base = require 'collections/base'

	Models =
		Database: require 'models/database'

	class Databases extends Base

		model: Models.Database
		
		url: '/mongo/dbs'

		parse: (attrs) ->
			attrs.databases