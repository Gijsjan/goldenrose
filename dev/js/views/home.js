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
        'click #breadcrumb .database': 'selectDB'
      };

      vEdit.prototype.selectDB = function() {
        this.databaseList.render().$el.fadeIn();
        this.collectionList.$el.fadeOut();
        return this.documentList.$el.fadeOut();
      };

      vEdit.prototype.addCollection = function() {
        var collName;
        collName = window.prompt("Enter collection name", "");
        if (collName != null) {
          return this.collectionList.collection.create({
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
        return this.documentList.collection.create(data, {
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
        this.databaseList = new Views.DatabaseList();
        this.$('#main aside').html(this.databaseList.$el);
        return this;
      };

      vEdit.prototype.showCollections = function() {
        var breadcrumbOffset, deltaLeft, deltaTop, liOffset,
          _this = this;
        this.databaseList.$el.fadeOut();
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
        return this.$('#' + config.current.database.id).animate({
          left: deltaLeft,
          top: deltaTop
        }, 500, function() {
          _this.$('#breadcrumb li.database').html(config.current.database.id);
          _this.collectionList = new Views.CollectionList();
          return _this.$('#main aside').html(_this.collectionList.$el);
        });
      };

      vEdit.prototype.showDocuments = function() {
        var breadcrumbOffset, deltaLeft, deltaTop, liOffset,
          _this = this;
        this.collectionList.$el.fadeOut();
        breadcrumbOffset = this.$('#breadcrumb .collection').offset();
        liOffset = this.$('#' + config.current.collection.id).offset();
        this.$('#' + config.current.collection.id).css({
          'left': '0px'
        });
        this.$('#' + config.current.collection.id).css({
          'position': 'relative'
        });
        deltaTop = breadcrumbOffset.top - liOffset.top;
        deltaLeft = breadcrumbOffset.left - liOffset.left;
        return this.$('#' + config.current.collection.id).animate({
          left: deltaLeft,
          top: deltaTop
        }, 500, function() {
          _this.$('#breadcrumb li.collection').html(config.current.collection.id);
          _this.documentList = new Views.DocumentList();
          _this.$('#main aside').append(_this.documentList.$el);
          _this.editor = ace.edit(_this.el.querySelector('#editor'));
          _this.editor.setTheme("ace/theme/textmate");
          return _this.editor.getSession().setMode("ace/mode/json");
        });
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
