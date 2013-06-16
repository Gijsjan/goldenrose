(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseModel, Database, _ref;
    BaseModel = require('models/base');
    return Database = (function(_super) {
      __extends(Database, _super);

      function Database() {
        _ref = Database.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Database.prototype.parse = function(attrs) {
        attrs.id = attrs.name;
        return attrs;
      };

      return Database;

    })(BaseModel);
  });

}).call(this);
