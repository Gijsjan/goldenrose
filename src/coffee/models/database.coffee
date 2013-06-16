define (require) ->

	BaseModel = require 'models/base'

	class Database extends BaseModel

		parse: (attrs) ->
			attrs.id = attrs.name

			attrs