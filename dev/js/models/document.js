(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var BaseModel, Document, _ref;
    BaseModel = require('models/base');
    return Document = (function(_super) {
      __extends(Document, _super);

      function Document() {
        _ref = Document.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Document.prototype.parse = function(attrs) {
        attrs.id = attrs._id;
        return attrs;
      };

      return Document;

    })(BaseModel);
  });

}).call(this);
