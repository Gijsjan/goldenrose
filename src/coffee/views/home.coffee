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
			@$('#databaseList .cell').html @databaseList.$el

			@

		showCollections: ->
			@databaseList.$el.fadeOut()

			breadcrumbOffset = @$('#breadcrumb .database').offset()
			liOffset = @$('#'+config.current.database.id).offset()

			@$('#'+config.current.database.id).css 'left': '0px'
			@$('#'+config.current.database.id).css 'position': 'relative'

			deltaTop = breadcrumbOffset.top - liOffset.top
			deltaLeft = breadcrumbOffset.left - liOffset.left
			
			@$('#'+config.current.database.id).animate
				left: deltaLeft
				top: deltaTop
			,
				500
			,
				=>
					@$('#breadcrumb .database').html config.current.database.id
					

			# @$('#dbsdiv ~ div').addClass('hidden')
			# @$('#dbshead ~ div').addClass('hidden')

			@collectionList = new Views.CollectionList()
			@$('#collectionList .cell').html @collectionList.$el

			# @$('#collshead').removeClass('hidden')
			# @$('#collsdiv').removeClass('hidden')

		showDocuments: ->
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
					@$('#breadcrumb .collection').html config.current.collection.id
					@collectionList.$el.fadeOut()

			# @$('#collsdiv ~ div').addClass('hidden')
			# @$('#collshead ~ div').addClass('hidden')

			@documentList = new Views.DocumentList()
			@$('#documentList .list').html @documentList.$el

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