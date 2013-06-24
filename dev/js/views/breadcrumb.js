(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseView, Templates, config, vEdit, _ref;
    config = require('config');
    BaseView = require('views/base');
    Templates = {
      Breadcrumb: require('text!html/breadcrumb.html')
    };
    return vEdit = (function(_super) {
      __extends(vEdit, _super);

      function vEdit() {
        _ref = vEdit.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      vEdit.prototype.id = 'breadcrumb';

      vEdit.prototype.className = 'row span1';

      vEdit.prototype.events = {
        'click .database': 'showDatabases',
        'click .collection': 'showCollections'
      };

      vEdit.prototype.showDatabases = function(ev) {
        this.$('li').html('');
        return this.trigger('showDatabases');
      };

      vEdit.prototype.showCollections = function(ev) {
        this.$('li.collection').html('');
        return this.trigger('showCollections');
      };

      vEdit.prototype.initialize = function() {
        vEdit.__super__.initialize.apply(this, arguments);
        return this.render();
      };

      vEdit.prototype.render = function() {
        var rhtml;
        rhtml = _.template(Templates.Breadcrumb);
        this.$el.html(rhtml);
        return this;
      };

      return vEdit;

    })(BaseView);
  });

}).call(this);
