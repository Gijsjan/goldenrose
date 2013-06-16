(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseModel, Collection, config, _ref;
    config = require('config');
    BaseModel = require('models/base');
    return Collection = (function(_super) {
      __extends(Collection, _super);

      function Collection() {
        _ref = Collection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Collection.prototype.url = function() {
        return '/mongo/db/' + config.current.database.id + '/colls';
      };

      Collection.prototype.parse = function(attrs) {
        console.log('parsing');
        attrs.id = attrs.name;
        return attrs;
      };

      return Collection;

    })(BaseModel);
  });

}).call(this);
