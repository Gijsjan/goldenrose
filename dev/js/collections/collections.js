(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Base, Collections, Models, config, _ref;
    config = require('config');
    Base = require('collections/base');
    Models = {
      Collection: require('models/collection')
    };
    return Collections = (function(_super) {
      __extends(Collections, _super);

      function Collections() {
        _ref = Collections.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Collections.prototype.model = Models.Collection;

      Collections.prototype.url = function() {
        return '/mongo/db/' + config.current.database.id + '/colls';
      };

      return Collections;

    })(Base);
  });

}).call(this);
