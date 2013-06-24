define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	Collections =
		Collections: require 'collections/collections'

	Templates =
		CollectionList: require 'text!html/collection.list.html'

	class CollectionList extends BaseView

		id: 'collectionlist'

		events:
			'click li': 'selectColl'

		selectColl: (ev) ->
			@$('.active').removeClass 'active'
			$(ev.currentTarget).addClass 'active'
			
			config.current.collection = @collection.get ev.currentTarget.id

			@publish 'collection:selected'

		
		initialize: ->
			super

			@collection = new Collections.Collections()
			@collection.fetch
				success: => 
					@render()
					@collection.on 'add', @render, @

		render: ->
			rhtml = _.template Templates.CollectionList
			@$el.html rhtml

			@collection.each (coll) =>
				@$('ul#collections').append $("<li id='#{coll.id}' />").html(coll.id)
