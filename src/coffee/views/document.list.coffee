define (require) ->
	config = require 'config'
	BaseView = require 'views/base'
	Collections =
		Documents: require 'collections/documents'

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
				success: => @render()

		render: ->
			@collection.each (doc) =>
				name = if doc.get('name')? then doc.get('name') else doc.id
				@$el.append $("<li id='#{doc.id}' />").html(name)

			@
