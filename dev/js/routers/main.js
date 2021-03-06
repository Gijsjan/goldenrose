(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, MainRouter, Views, _ref;
    Backbone = require('backbone');
    Views = {
      Home: require('views/home')
    };
    return MainRouter = (function(_super) {
      __extends(MainRouter, _super);

      function MainRouter() {
        _ref = MainRouter.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      MainRouter.prototype['routes'] = {
        '': 'home'
      };

      MainRouter.prototype.home = function() {
        var h;
        h = new Views.Home();
        return $('body').html(h.$el);
      };

      return MainRouter;

    })(Backbone.Router);
  });

}).call(this);
