(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, Models, Templates, Views, ace, config, vEdit, _ref;
    config = require('config');
    ace = require('ace/ace');
    BaseView = require('views/base');
    Models = {
      Collection: require('models/collection')
    };
    Templates = {
      Home: require('text!html/home.html')
    };
    Views = {
      DatabaseList: require('views/database.list'),
      CollectionList: require('views/collection.list'),
      DocumentList: require('views/document.list')
    };
    return vEdit = (function(_super) {
      __extends(vEdit, _super);

      function vEdit() {
        _ref = vEdit.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      vEdit.prototype.events = {
        'click .add.collection': 'addCollection'
      };

      vEdit.prototype.addCollection = function() {
        var collName, model;
        collName = window.prompt("Enter collection name", "");
        if (collName != null) {
          model = new Models.Collection({
            name: collName
          });
          model.save();
          return this.collList.collection.add(model, {
            parse: true
          });
        }
      };

      vEdit.prototype.initialize = function() {
        vEdit.__super__.initialize.apply(this, arguments);
        this.subscribe('DatabaseList:selected', this.showCollections);
        this.subscribe('CollectionList:selected', this.showDocuments);
        this.subscribe('DocumentList:selected', this.showDocument);
        return this.render();
      };

      vEdit.prototype.render = function() {
        var rhtml;
        rhtml = _.template(Templates.Home);
        this.$el.html(rhtml);
        this.dbList = new Views.DatabaseList();
        this.$('#dbsdiv').html(this.dbList.$el);
        this.editor = ace.edit(this.el.querySelector('#editor'));
        this.editor.setTheme("ace/theme/textmate");
        this.editor.getSession().setMode("ace/mode/json");
        return this;
      };

      vEdit.prototype.showCollections = function() {
        this.$('#dbsdiv ~ div').addClass('hidden');
        this.$('#dbshead ~ div').addClass('hidden');
        this.collList = new Views.CollectionList();
        this.$('#collsdiv').html(this.collList.$el);
        this.$('#collshead').removeClass('hidden');
        return this.$('#collsdiv').removeClass('hidden');
      };

      vEdit.prototype.showDocuments = function() {
        this.$('#collsdiv ~ div').addClass('hidden');
        this.$('#collshead ~ div').addClass('hidden');
        this.docList = new Views.DocumentList();
        this.$('#docsdiv').html(this.docList.$el);
        this.$('#docshead').removeClass('hidden');
        return this.$('#docsdiv').removeClass('hidden');
      };

      vEdit.prototype.showDocument = function() {
        var attrs;
        attrs = $.extend({}, config.current.document.attributes);
        delete attrs.id;
        this.editor.setValue(JSON.stringify(attrs, null, 4), -1);
        $('#editorhead').removeClass('hidden');
        return $('#editordiv').removeClass('hidden');
      };

      return vEdit;

    })(BaseView);
  });

}).call(this);
