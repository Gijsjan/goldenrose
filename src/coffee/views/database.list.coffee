define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	Collections =
		Databases: require 'collections/databases'

	Templates =
		DatabaseList: require 'text!html/database.list.html'

	class DatabaseList extends BaseView

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
			rhtml = _.template Templates.DatabaseList
			@$el.html rhtml
			
			@collection.each (db) =>
				@$('ul#databases').append $("<li id='#{db.id}' />").html(db.id)

			@
