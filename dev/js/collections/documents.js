(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Base, Documents, Models, config, _ref;
    config = require('config');
    Base = require('collections/base');
    Models = {
      Document: require('models/document')
    };
    return Documents = (function(_super) {
      __extends(Documents, _super);

      function Documents() {
        _ref = Documents.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Documents.prototype.model = Models.Document;

      Documents.prototype.url = function() {
        return '/mongo/db/' + config.current.database.id + '/coll/' + config.current.collection.id;
      };

      return Documents;

    })(Base);
  });

}).call(this);
