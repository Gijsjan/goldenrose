(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, Collections, DatabaseList, Templates, config, _ref;
    config = require('config');
    BaseView = require('views/base');
    Collections = {
      Databases: require('collections/databases')
    };
    Templates = {
      DatabaseList: require('text!html/database.list.html')
    };
    return DatabaseList = (function(_super) {
      __extends(DatabaseList, _super);

      function DatabaseList() {
        _ref = DatabaseList.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DatabaseList.prototype.id = 'databaselist';

      DatabaseList.prototype.events = {
        'click li': 'selectDB'
      };

      DatabaseList.prototype.selectDB = function(ev) {
        this.$('.active').removeClass('active');
        $(ev.currentTarget).addClass('active');
        config.current.database = this.collection.get(ev.currentTarget.id);
        return this.publish('database:selected');
      };

      DatabaseList.prototype.initialize = function() {
        var _this = this;
        DatabaseList.__super__.initialize.apply(this, arguments);
        this.collection = new Collections.Databases();
        return this.collection.fetch({
          success: function() {
            _this.collection.on('add', _this.render, _this);
            return _this.render();
          }
        });
      };

      DatabaseList.prototype.render = function() {
        var rhtml,
          _this = this;
        rhtml = _.template(Templates.DatabaseList);
        this.$el.html(rhtml);
        this.collection.each(function(db) {
          return _this.$('ul#databases').append($("<li id='" + db.id + "' />").html(db.id));
        });
        return this;
      };

      return DatabaseList;

    })(BaseView);
  });

}).call(this);
