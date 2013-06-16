define (require) ->

	BaseModel = require 'models/base'

	class Document extends BaseModel

		parse: (attrs) ->
			attrs.id = attrs._id

			attrs