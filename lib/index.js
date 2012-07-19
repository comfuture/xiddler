(function() {
  var WebUI, Xiddler, fs, http, nstore, proxy, session, spawn, url;

  http = require('http');

  proxy = require('http-proxy');

  spawn = require('child_process').spawn;

  nstore = require('nstore');

  session = nstore["new"]('var/session.db');

  WebUI = require('./webui').WebUI;

  url = require('url');

  fs = require('fs');

  Xiddler = (function() {
    var NETWORK, PROXY_PORT, UI_PORT, netset, sh;

    NETWORK = 'Ethernet';

    PROXY_PORT = 8000;

    UI_PORT = 9999;

    sh = function(cmd, options, callback) {
      var proc;
      if (options == null) options = [];
      proc = spawn(cmd, options);
      proc.on('exit', function(status) {
        if (status === 0) {
          return typeof callback === "function" ? callback() : void 0;
        }
      });
      return proc;
    };

    netset = function(args, callback) {
      return sh('networksetup', args, callback);
    };

    function Xiddler() {
      this.ui = new WebUI();
    }

    Xiddler.prototype.run = function() {
      var proxyRouter, proxyServer,
        _this = this;
      proxyRouter = new proxy.RoutingProxy();
      proxyServer = http.createServer(function(req, res) {
        var client, options, origin;
        console.log(req.url);
        origin = url.parse(req.url);
        options = {
          host: origin.hostname,
          port: origin.port || 80,
          path: origin.href.split(origin.host)[1],
          method: req.method,
          headers: req.headers
        };
        client = http.request(options, function(result) {
          res.writeHead(result.statusCode, '', result.headers);
          result.on('data', function(chunk) {
            return res.write(chunk);
          });
          return result.on('end', function() {
            return res.end();
          });
        });
        req.on('data', function(chunk) {
          return client.write(chunk);
        });
        req.on('end', function() {
          return client.end();
        });
        client.on('error', function() {
          return res.end();
        });
        return client.end();
      });
      proxyServer.listen(8000);
      console.log('proxy server ready on localhost:8000');
      netset(['-setwebproxy', NETWORK, 'localhost', PROXY_PORT], function() {
        return netset(['-setproxybypassdomains', NETWORK, '*.local', '169.254/16', 'localhost'], function() {
          return netset(['-setwebproxystate', NETWORK, 'on'], function() {
            console.log('enabled proxy localhost:8000');
            _this.startWebUI();
            return sh('Open', ['http://localhost:9999']);
          });
        });
      });
      return process.on('SIGINT', function() {
        sh('networksetup', ['-setwebproxystate', 'Ethernet', 'off']);
        return process.exit();
      });
    };

    Xiddler.prototype.startWebUI = function() {
      this.ui.listen(UI_PORT);
      return console.log("listening web ui on port " + UI_PORT);
    };

    Xiddler.prototype.backupProxySetting = function() {
      return netset(['-getproxybypassdomains']);
    };

    Xiddler.prototype.restoreProxySetting = function() {
      return netset(['-setwebproxystate', NETWORK, 'off'], function() {
        return process.exit();
      });
    };

    return Xiddler;

  })();

  exports.Xiddler = Xiddler;

}).call(this);
