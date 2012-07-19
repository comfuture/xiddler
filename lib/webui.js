(function() {
  var WebUI, express, underscore;

  express = require('express');

  underscore = require('underscore');

  WebUI = (function() {
    var _;

    _ = underscore.noConflict();

    _.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g,
      evaluate: /\{%(.+?)%\}/g
    };

    function WebUI() {
      var _this = this;
      this.app = express.createServer();
      this.app.configure(function() {
        _this.app.use(express.bodyParser());
        _this.app.use(_this.app.router);
        _this.app.use(express.static(__dirname + '/static'));
        _this.app.set('views', __dirname + '/templates');
        _this.app.set('view options', {
          layout: false
        });
        return _this.app.register('.html', {
          compile: function(src, options) {
            var template;
            template = _.template(src);
            return function(context) {
              return template(context);
            };
          }
        });
      });
      this.app.get('/', function(req, res) {
        return res.render('index.html');
      });
    }

    WebUI.prototype.listen = function(port) {
      if (port == null) port = 41661;
      return this.app.listen(port);
    };

    return WebUI;

  })();

  exports.WebUI = WebUI;

}).call(this);
