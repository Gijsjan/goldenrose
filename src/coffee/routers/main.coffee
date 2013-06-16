define (require) ->
	Backbone = require 'backbone'

	Views =
		Home: require 'views/home'

	class MainRouter extends Backbone.Router

		'routes':
			'': 'home'

		home: ->
			h = new Views.Home()
			$('body').html h.$el