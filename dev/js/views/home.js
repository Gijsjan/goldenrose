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
        'click .add.collection': 'addCollection',
        'click .add.document': 'addDocument',
        'click .save.document': 'saveDocument'
      };

      vEdit.prototype.addCollection = function() {
        var collName;
        collName = window.prompt("Enter collection name", "");
        if (collName != null) {
          return this.collList.collection.create({
            name: collName
          }, {
            wait: true
          });
        }
      };

      vEdit.prototype.addDocument = function() {
        var data;
        data = {
          "": ""
        };
        this.editor.setValue(JSON.stringify(data, null, 4), -1);
        $('#editorhead').removeClass('hidden');
        return $('#editordiv').removeClass('hidden');
      };

      vEdit.prototype.saveDocument = function() {
        var data;
        data = JSON.parse(this.editor.getValue());
        return this.docList.collection.create(data, {
          wait: true
        });
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
        var breadcrumbOffset, deltaLeft, deltaTop, liOffset,
          _this = this;
        breadcrumbOffset = this.$('#breadcrumb .database').offset();
        liOffset = this.$('#' + config.current.database.id).offset();
        this.$('#' + config.current.database.id).css({
          'left': '0px'
        });
        this.$('#' + config.current.database.id).css({
          'position': 'relative'
        });
        deltaTop = breadcrumbOffset.top - liOffset.top;
        deltaLeft = breadcrumbOffset.left - liOffset.left;
        this.$('#' + config.current.database.id).animate({
          left: deltaLeft,
          top: deltaTop
        }, 500, function() {
          _this.$('#breadcrumb .database').html(config.current.database.id);
          return _this.dbList.remove();
        });
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
