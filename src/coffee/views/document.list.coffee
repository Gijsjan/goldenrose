define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	Collections =
		Documents: require 'collections/documents'

	Templates =
		DocumentList: require 'text!html/document.list.html'

	class DocumentList extends BaseView
		
		id: 'docs'
		
		tagName: 'ul'

		events:
			'click li': 'selectDoc'

		selectDoc: (ev) ->
			@$('.active').removeClass 'active'
			$(ev.currentTarget).addClass 'active'
			
			config.current.document = @collection.get ev.currentTarget.id

			@publish 'DocumentList:selected'

		
		initialize: ->
			super

			@collection = new Collections.Documents()
			@collection.fetch
				success: => 
					@collection.on 'add', @render, @
					@render()


		render: ->
			rhtml = _.template Templates.DocumentList
			@$el.html rhtml
			
			@collection.each (doc) =>
				name = if doc.get('name')? then doc.get('name') else doc.id
				@$('ul#documents').append $("<li id='#{doc.id}' />").html(name)

			@
