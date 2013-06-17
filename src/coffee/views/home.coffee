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
			'click .add.collection': 'addCollection'
			'click .add.document': 'addDocument'
			'click .save.document': 'saveDocument'

		addCollection: ->
			collName = window.prompt "Enter collection name", ""
			if collName?
				@collList.collection.create
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

			@docList.collection.create data, wait: true

		initialize: ->
			super

			@subscribe 'DatabaseList:selected', @showCollections
			@subscribe 'CollectionList:selected', @showDocuments
			@subscribe 'DocumentList:selected', @showDocument

			@render()

		render: ->
			rhtml = _.template Templates.Home
			@$el.html rhtml

			@dbList = new Views.DatabaseList()
			@$('#dbsdiv').html @dbList.$el

			@editor = ace.edit @el.querySelector('#editor')
			@editor.setTheme "ace/theme/textmate"
			@editor.getSession().setMode "ace/mode/json"

			@

		showCollections: ->
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
					@dbList.remove()

			@$('#dbsdiv ~ div').addClass('hidden')
			@$('#dbshead ~ div').addClass('hidden')

			@collList = new Views.CollectionList()
			@$('#collsdiv').html @collList.$el

			@$('#collshead').removeClass('hidden')
			@$('#collsdiv').removeClass('hidden')

		showDocuments: ->
			@$('#collsdiv ~ div').addClass('hidden')
			@$('#collshead ~ div').addClass('hidden')

			@docList = new Views.DocumentList()
			@$('#docsdiv').html @docList.$el

			@$('#docshead').removeClass('hidden')
			@$('#docsdiv').removeClass('hidden')

		showDocument: ->
			attrs = $.extend {}, config.current.document.attributes # DeepCopy attributes
			delete attrs.id

			@editor.setValue(JSON.stringify(attrs, null, 4), -1);

			$('#editorhead').removeClass('hidden');
			$('#editordiv').removeClass('hidden');