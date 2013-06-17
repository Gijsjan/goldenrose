(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, CollectionList, Collections, Templates, config, _ref;
    config = require('config');
    BaseView = require('views/base');
    Collections = {
      Collections: require('collections/collections')
    };
    Templates = {
      CollectionList: require('text!html/collection.list.html')
    };
    return CollectionList = (function(_super) {
      __extends(CollectionList, _super);

      function CollectionList() {
        _ref = CollectionList.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CollectionList.prototype.events = {
        'click li': 'selectColl'
      };

      CollectionList.prototype.selectColl = function(ev) {
        this.$('.active').removeClass('active');
        $(ev.currentTarget).addClass('active');
        config.current.collection = this.collection.get(ev.currentTarget.id);
        return this.publish('CollectionList:selected');
      };

      CollectionList.prototype.initialize = function() {
        var _this = this;
        CollectionList.__super__.initialize.apply(this, arguments);
        this.collection = new Collections.Collections();
        return this.collection.fetch({
          success: function() {
            _this.render();
            return _this.collection.on('add', _this.render, _this);
          }
        });
      };

      CollectionList.prototype.render = function() {
        var rhtml,
          _this = this;
        rhtml = _.template(Templates.CollectionList);
        this.$el.html(rhtml);
        return this.collection.each(function(coll) {
          return _this.$('ul#collections').append($("<li id='" + coll.id + "' />").html(coll.id));
        });
      };

      return CollectionList;

    })(BaseView);
  });

}).call(this);
