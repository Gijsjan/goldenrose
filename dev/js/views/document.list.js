(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, Collections, DocumentList, Templates, config, _ref;
    config = require('config');
    BaseView = require('views/base');
    Collections = {
      Documents: require('collections/documents')
    };
    Templates = {
      DocumentList: require('text!html/document.list.html')
    };
    return DocumentList = (function(_super) {
      __extends(DocumentList, _super);

      function DocumentList() {
        _ref = DocumentList.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DocumentList.prototype.id = 'docs';

      DocumentList.prototype.tagName = 'ul';

      DocumentList.prototype.events = {
        'click li': 'selectDoc'
      };

      DocumentList.prototype.selectDoc = function(ev) {
        this.$('.active').removeClass('active');
        $(ev.currentTarget).addClass('active');
        config.current.document = this.collection.get(ev.currentTarget.id);
        return this.publish('DocumentList:selected');
      };

      DocumentList.prototype.initialize = function() {
        var _this = this;
        DocumentList.__super__.initialize.apply(this, arguments);
        this.collection = new Collections.Documents();
        return this.collection.fetch({
          success: function() {
            _this.collection.on('add', _this.render, _this);
            return _this.render();
          }
        });
      };

      DocumentList.prototype.render = function() {
        var rhtml,
          _this = this;
        rhtml = _.template(Templates.DocumentList);
        this.$el.html(rhtml);
        this.collection.each(function(doc) {
          var name;
          name = doc.get('name') != null ? doc.get('name') : doc.id;
          return _this.$('ul#documents').append($("<li id='" + doc.id + "' />").html(name));
        });
        return this;
      };

      return DocumentList;

    })(BaseView);
  });

}).call(this);
