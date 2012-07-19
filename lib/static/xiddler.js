(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  g.use('$', 'jquery-layout', 'slick.grid', 'backbone')(function() {
    var Collection, Log, LogPane, Model, Request, Response, View, Xiddler, mvc;
    mvc = Backbone.noConflict();
    Model = mvc.Model, Collection = mvc.Collection, View = mvc.View;
    Request = (function(_super) {

      __extends(Request, _super);

      function Request() {
        Request.__super__.constructor.apply(this, arguments);
      }

      Request.prototype.defaults = {
        url: '',
        method: 'GET',
        headers: {}
      };

      return Request;

    })(Model);
    Response = (function(_super) {

      __extends(Response, _super);

      function Response() {
        Response.__super__.constructor.apply(this, arguments);
      }

      Response.prototype.defaults = {
        url: '',
        headers: {},
        body: ''
      };

      return Response;

    })(Model);
    Log = (function(_super) {

      __extends(Log, _super);

      function Log() {
        Log.__super__.constructor.apply(this, arguments);
      }

      Log.prototype.model = Request;

      return Log;

    })(Collection);
    LogPane = (function(_super) {

      __extends(LogPane, _super);

      function LogPane() {
        LogPane.__super__.constructor.apply(this, arguments);
      }

      LogPane.prototype.initialize = function() {
        return this.collection = new Log();
      };

      return LogPane;

    })(View);
    return Xiddler = (function(_super) {

      __extends(Xiddler, _super);

      function Xiddler() {
        Xiddler.__super__.constructor.apply(this, arguments);
      }

      return Xiddler;

    })(View);
  });

}).call(this);