define (require) ->

	config = require 'config'

	ace = require 'ace/ace'

	BaseView = require 'views/base'

	Models =
		Collection: require 'models/collection'

	Templates =
		Home: require 'text!html/home.html'

	Views =
		Breadcrumb: require 'views/breadcrumb'
		DatabaseList: require 'views/database.list'
		CollectionList: require 'views/collection.list'
		DocumentList: require 'views/document.list'

	class vEdit extends BaseView

		events:
			'click #breadcrumb .database': 'selectDB'

		selectDB: ->
			@databaseList.render().$el.fadeIn()
			@collectionList.$el.fadeOut()
			@documentList.$el.fadeOut()


		addCollection: ->
			collName = window.prompt "Enter collection name", ""
			if collName?
				@collectionList.collection.create
					name: collName
				,
					wait: true

		addDocument: ->
			data =
				"": ""

			@editor.setValue JSON.stringify(data, null, 4), -1

		saveDocument: ->
			data = JSON.parse @editor.getValue()

			@documentList.collection.create data, wait: true

		initialize: ->
			super

			@subscribe 'database:selected', @showCollections
			@subscribe 'collection:selected', @showDocuments
			@subscribe 'document:selected', @showDocument

			@breadcrumb = new Views.Breadcrumb()
			@breadcrumb.on 'showDatabases', => @showDatabases()
			@breadcrumb.on 'showCollections', => @showCollections()
			@render()

		render: ->
			rhtml = _.template Templates.Home
			@$el.html rhtml

			@$('#main').prepend @breadcrumb.$el

			@showDatabases()

			@

		showDatabases: ->
			@databaseList = new Views.DatabaseList()
			@$('#main aside').html @databaseList.$el

		showCollections: ->
			@databaseList.$el.fadeOut()

			@animate 'database', =>
				@collectionList = new Views.CollectionList()
				@$('#main aside').html @collectionList.$el

		showDocuments: ->
			@collectionList.$el.fadeOut()

			@animate 'collection', =>
				@documentList = new Views.DocumentList()
				@$('#main aside').append @documentList.$el

				@editor = ace.edit @el.querySelector('#editor')
				@editor.setTheme "ace/theme/textmate"
				@editor.getSession().setMode "ace/mode/json"
				@$('#editor').height @$('.panel').height()

		showDocument: ->
			attrs = $.extend {}, config.current.document.attributes # DeepCopy attributes
			delete attrs.id

			@editor.setValue(JSON.stringify(attrs, null, 4), -1);

		animate: (type, cb) ->
			breadcrumbOffset = @$('#breadcrumb .'+type).offset()
			liOffset = @$('#'+config.current[type].id).offset()

			@$('#'+config.current[type].id).css 'left': '0px'
			@$('#'+config.current[type].id).css 'position': 'relative'

			deltaTop = breadcrumbOffset.top - liOffset.top
			deltaLeft = breadcrumbOffset.left - liOffset.left
			
			@$('#'+config.current[type].id).animate
				left: deltaLeft
				top: deltaTop
			,
				500
			,
				=>
					@$('#breadcrumb li.'+type).html config.current[type].id

					cb()