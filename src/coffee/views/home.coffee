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

		addCollection: ->
			collName = window.prompt "Enter collection name", ""
			if collName?
				model = new Models.Collection 
					name: collName
				model.save()
				@collList.collection.add model, parse:true

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