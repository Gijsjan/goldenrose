define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	Collections =
		Databases: require 'collections/databases'

	class DatabaseList extends BaseView
		
		id: 'dbs'
		
		tagName: 'ul'

		events:
			'click li': 'selectDB'

		selectDB: (ev) ->
			@$('.active').removeClass 'active'
			$(ev.currentTarget).addClass 'active'
			
			config.current.database = @collection.get ev.currentTarget.id

			@publish 'DatabaseList:selected'

		
		initialize: ->
			super

			@collection = new Collections.Databases()
			@collection.fetch
				success: => 
					@collection.on 'add', @render, @
					@render()

		render: ->
			@$el.html ''
			
			@collection.each (db) =>
				@$el.append $("<li id='#{db.id}' />").html(db.id)

			@
