define (require) ->

	config = require 'config'

	BaseView = require 'views/base'

	Templates =
		Breadcrumb: require 'text!html/breadcrumb.html'

	class vEdit extends BaseView
		id: 'breadcrumb'
		className: 'row span1'

		events:
			'click .database': 'showDatabases'
			'click .collection': 'showCollections'

		showDatabases: (ev) -> 
			@$('li').html ''
			@trigger 'showDatabases'

		showCollections: (ev) -> 
			@$('li.collection').html ''
			@trigger 'showCollections'

		initialize: ->
			super

			@render()

		render: ->
			rhtml = _.template Templates.Breadcrumb
			@$el.html rhtml

			@