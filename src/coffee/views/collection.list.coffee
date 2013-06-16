define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	Collections =
		Collections: require 'collections/collections'

	class CollectionList extends BaseView
		
		id: 'colls'
		
		tagName: 'ul'

		events:
			'click li': 'selectColl'

		selectColl: (ev) ->
			@$('.active').removeClass 'active'
			$(ev.currentTarget).addClass 'active'
			
			config.current.collection = @collection.get ev.currentTarget.id

			@publish 'CollectionList:selected'

		
		initialize: ->
			super

			@collection = new Collections.Collections()
			@collection.fetch
				success: => 
					@render()
					@collection.on 'add', @render, @

		render: ->
			@$el.html ''

			@collection.each (coll) =>
				@$el.append $("<li id='#{coll.id}' />").html(coll.id)
