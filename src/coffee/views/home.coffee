define (require) ->

	config = require 'config'

	ace = require 'ace/ace'

	BaseView = require 'views/base'

	Models =
		Collection: require 'models/collection'

	Templates =
		Home: require 'text!html/home.html'

	Views =
		DatabaseList: require 'views/database.list'
		CollectionList: require 'views/collection.list'
		DocumentList: require 'views/document.list'

	class vEdit extends BaseView

		events:
			'click #breadcrumb .database': 'selectDB'
			# 'click .add.collection': 'addCollection'
			# 'click .add.document': 'addDocument'
			# 'click .save.document': 'saveDocument'

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

			$('#editorhead').removeClass 'hidden'
			$('#editordiv').removeClass 'hidden'

		saveDocument: ->
			data = JSON.parse @editor.getValue()

			@documentList.collection.create data, wait: true

		initialize: ->
			super

			@subscribe 'DatabaseList:selected', @showCollections
			@subscribe 'CollectionList:selected', @showDocuments
			@subscribe 'DocumentList:selected', @showDocument

			@render()

		render: ->
			rhtml = _.template Templates.Home
			@$el.html rhtml

			@databaseList = new Views.DatabaseList()
			@$('#main aside').html @databaseList.$el

			@

		showCollections: ->
			@databaseList.$el.fadeOut()
			
			breadcrumbOffset = @$('#breadcrumb .database').offset()
			liOffset = @$('#'+config.current.database.id).offset()

			$li = $ "<li>#{config.current.database.id}</li>"
			# TODO: Use class
			$li.css 'left': liOffset.left+'px'
			$li.css 'top': liOffset.top+'px'
			$li.css 'position': 'absolute'
			$li.css 'z-index': '1000'

			$('body').append $li
			
			$li.animate
				left: breadcrumbOffset.left
				top: breadcrumbOffset.top
			,
				500
			,
				=>
					@$('#breadcrumb li.database').html $li # Change class

					@collectionList = new Views.CollectionList()
					@$('#main aside').html @collectionList.$el

		showDocuments: ->
			@collectionList.$el.fadeOut()

			breadcrumbOffset = @$('#breadcrumb .collection').offset()
			liOffset = @$('#'+config.current.collection.id).offset()

			@$('#'+config.current.collection.id).css 'left': '0px'
			@$('#'+config.current.collection.id).css 'position': 'relative'

			deltaTop = breadcrumbOffset.top - liOffset.top
			deltaLeft = breadcrumbOffset.left - liOffset.left
			
			@$('#'+config.current.collection.id).animate
				left: deltaLeft
				top: deltaTop
			,
				500
			,
				=>
					@$('#breadcrumb li.collection').html config.current.collection.id
					

			# @$('#collsdiv ~ div').addClass('hidden')
			# @$('#collshead ~ div').addClass('hidden')

					@documentList = new Views.DocumentList()
					@$('#main aside').append @documentList.$el

					console.log @el.querySelector('#editor')
					@editor = ace.edit @el.querySelector('#editor')
					@editor.setTheme "ace/theme/textmate"
					@editor.getSession().setMode "ace/mode/json"

			# @$('#docshead').removeClass('hidden')
			# @$('#docsdiv').removeClass('hidden')

		showDocument: ->
			attrs = $.extend {}, config.current.document.attributes # DeepCopy attributes
			delete attrs.id

			@editor.setValue(JSON.stringify(attrs, null, 4), -1);

			$('#editorhead').removeClass('hidden');
			$('#editordiv').removeClass('hidden');