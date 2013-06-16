(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Base, Databases, Models, _ref;
    Base = require('collections/base');
    Models = {
      Database: require('models/database')
    };
    return Databases = (function(_super) {
      __extends(Databases, _super);

      function Databases() {
        _ref = Databases.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Databases.prototype.model = Models.Database;

      Databases.prototype.url = '/mongo/dbs';

      Databases.prototype.parse = function(attrs) {
        return attrs.databases;
      };

      return Databases;

    })(Base);
  });

}).call(this);
