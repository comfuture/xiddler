// Generated by CoffeeScript 1.3.3
var g,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

g = (function() {
  var done, evil, extend, lastTag, match, merge, src, tags, _base, _callbacks, _ready, _ref, _ref1, _resolve, _stack;
  g = (_ref = this.g) != null ? _ref : function() {
    return g.ready.apply(window, arguments);
  };
  if ((_ref1 = (_base = Array.prototype).indexof) == null) {
    _base.indexof = function(item) {
      var from, i, len, _i;
      len = this.length;
      from = Number(arguments[1] || 0);
      from = from < 0 ? Math.ceil(from + len) : Math.floor(from);
      for (i = _i = from; from <= len ? _i <= len : _i >= len; i = from <= len ? ++_i : --_i) {
        if (i in this && this[i] === item) {
          return i;
        }
      }
      return -1;
    };
  }
  (function(a,b){typeof module!="undefined"?module.exports=b():typeof define=="function"&&define.amd?define(a,b):g[a]=b()})("$script",function(){function q(a,b,c){for(c=0,j=a.length;c<j;++c)if(!b(a[c]))return k;return 1}function r(a,b){q(a,function(a){return!b(a)})}function s(a,b,i){function o(a){return a.call?a():d[a]}function p(){if(!--n){d[m]=1,k&&k();for(var a in f)q(a.split("|"),o)&&!r(f[a],o)&&(f[a]=[])}}a=a[l]?a:[a];var j=b&&b.call,k=j?b:i,m=j?a.join(""):b,n=a.length;return setTimeout(function(){r(a,function(a){if(h[a])return m&&(e[m]=1),h[a]==2&&p();h[a]=1,m&&(e[m]=1),t(!c.test(a)&&g?g+a+".js":a,p)})},0),s}function t(c,d){var e=a.createElement("script"),f=k;e.charset='utf-8';e.onload=e.onerror=e[p]=function(){if(e[n]&&!/^c|loade/.test(e[n])||f)return;e.onload=e[p]=null,f=1,h[c]=2,d()},e.async=1,e.src=c,b.insertBefore(e,b.firstChild)}var a=document,b=a.getElementsByTagName("head")[0],c=/^https?:\/\//,d={},e={},f={},g,h={},i="string",k=!1,l="push",m="DOMContentLoaded",n="readyState",o="addEventListener",p="onreadystatechange";return!a[n]&&a[o]&&(a[o](m,function u(){a.removeEventListener(m,u,k),a[n]="complete"},k),a[n]="loading"),s.get=t,s.order=function(a,b,c){(function d(e){e=a.shift(),a.length?s(e,d):s(e,b,c)})()},s.path=function(a){g=a},s.ready=function(a,b,c){a=a[l]?a:[a];var e=[];return!r(a,function(a){d[a]||e[l](a)})&&q(a,function(a){return d[a]})?b():!function(a){f[a]=f[a]||[],f[a][l](b),c&&c(e)}(a.join("|")),s},s});;

  g.$script.chain = function() {
    var callback, items, makeChain;
    items = Array.prototype.slice.apply(arguments);
    callback = typeof items[items.length - 1] === 'function' ? items.pop() : function() {};
    makeChain = function(items, callback) {
      var item;
      if (callback == null) {
        callback = function() {};
      }
      if (items.length > 0) {
        item = items.shift();
        return function() {
          return g.$script(item, makeChain(items, callback));
        };
      } else {
        return callback;
      }
    };
    return makeChain(items, callback)();
  };
  g.defaults = {
    compress: true,
    modulesDir: 'g'
  };
  tags = document.getElementsByTagName('SCRIPT');
  g.tag = lastTag = tags[tags.length - 1];
  src = lastTag.getAttribute('src');
  g.base = src.substr(0, src.lastIndexOf('/'));
  extend = function(object, properties) {
    var key, val;
    for (key in properties) {
      val = properties[key];
      object[key] = val;
    }
    return object;
  };
  merge = function(options, overrides) {
    return extend(extend({}, options), overrides);
  };
  match = /(?:\?([^#]*))?(?:#(.*))?$/.exec(src);
  g.option = extend(g.defaults, (function(query) {
    var qa, wym;
    wym = function(s) {
      var i;
      if (/^(true|yes|on)$/i.test(s)) {
        return true;
      }
      if (/^(false|no|off)$/i.test(s)) {
        return false;
      }
      if (!isNaN(i = Number(s))) {
        return i;
      }
      return s;
    };
    qa = {};
    query = decodeURIComponent(query);
    query.replace(/([^=]+)=([^&]*)(&|$)/g, function() {
      qa[arguments[1]] = wym(arguments[2]);
      return arguments[0];
    });
    return qa;
  })((match != null ? match[1] : void 0) || match));
  g.frameworks = {
    'jquery': [''],
    'jquery-ui': [''],
    'underscore': [''],
    'backbone': [''],
    'json2': ['']
  };
  _ready = false;
  g.modules = g.files = [];
  _stack = _callbacks = [];
  _ref = 0;
  done = function() {
    var func;
    if (--_ref === 0) {
      while ((func = _stack.pop()) != null) {
        func();
      }
      return _ready = true;
    }
  };
  g.namespace = _resolve = function(name) {
    var found, i, levels, _i, _ref2, _ref3;
    found = g;
    levels = name.split('.');
    if (!name) {
      return found;
    }
    for (i = _i = 0, _ref2 = levels.length; 0 <= _ref2 ? _i < _ref2 : _i > _ref2; i = 0 <= _ref2 ? ++_i : --_i) {
      found[levels[i]] = found[levels[i]] || {};
      found = (_ref3 = found[levels[i]]) != null ? _ref3 : {};
    }
    return found;
  };
  g.resource = function() {
    var cb, csss, file, images, link, scripts, _i, _len, _ref2;
    scripts = csss = images = [];
    _ref2 = Array.prototype.slice.call(arguments);
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      file = _ref2[_i];
      switch (file.split('.').pop()) {
        case 'js':
          scripts.push(file);
          break;
        case 'gif':
        case 'jpg':
        case 'png':
          (new Image()).src = file;
          break;
        case 'css':
          link = document.createElement('LINK');
          link.type = 'text/css';
          link.rel = 'stylesheet';
          link.href = file;
          document.getElementsByTagName('head')[0].appendChild(link);
      }
    }
    if (scripts.length) {
      scripts.push(done);
      _ref++;
      g.$script.chain.apply(this, scripts);
    }
    return cb = function(callback) {
      if (callback) {
        return _callbacks.push(callback);
      }
    };
  };
  g.use = function() {
    var append, callbacks, cb, item, makePath, name, prepend, resolveAlias, resolveDeps, scripts, version, _i, _item, _len, _ref2;
    scripts = callbacks = [];
    makePath = function(name) {
      var file, v, version, _i, _len, _ref2, _ref3;
      if (!name) {
        return '';
      }
      file = name.split("/").pop()
      return "" + g.base + "/" + name + "/" + file + (g.option.compress ? '.min.js' : '.js');
    };
    append = function(path) {
      if (path && __indexOf.call(scripts, path) < 0) {
        return scripts.push(path);
      }
    };
    prepend = function(path) {
      if (path && __indexOf.call(scripts, path) < 0) {
        return scripts.unshift(path);
      }
    };
    resolveAlias = function(name) {
      switch (name) {
        case '$':
	  name = 'jquery';
          break;
        case '_':
          name = 'underscore';
      }
      return name;
    };
    resolveDeps = function(name) {
      if (name === 'backbone') {
        prepend(makePath('underscore'));
        if (!window.JSON) {
          prepend(makePath('json2'));
        }
      }
      if (name == 'slick.grid') {
	prepend(makePath('jquery-ui'));
        prepend(makePath('slick.grid/slick.core'));
      }
      if (name == 'jquery-layout') {
        prepend(makePath('jquery-ui'));
      }
      if (name == 'jquery-ui') {
        prepend(makePath('jquery'));
      }
      if (name === 'json2' && 'JSON' in window) {
        name = null;
      }
      return name;
    };
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      item = arguments[_i];
      if (typeof item === 'function') {
        callbacks.push(item);
      }
      if (typeof item === 'string') {
        append(makePath(resolveDeps(item)));
      } else if (!!(item && item.concat && item.unshift && !item.callee)) {
        append((function() {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = item.length; _j < _len1; _j++) {
            _item = item[_j];
            _results.push(makePath(resolveDeps(_item)));
          }
          return _results;
        })());
      }
    }
    _ref++;
    scripts.push(done);
    g.$script.chain.apply(this, scripts);
    cb = function(callback) {
      if (callback) {
        return _callbacks.push(callback);
      }
    };
    return cb;
  };
  g.require = function() {
    var cb, id, m, makePath, modules, s, scripts;
    id = "$script" + (Math.random() * 100000000);
    makePath = function(name) {
      return "" + g.base + "/" + g.option.modulesDir + "/" + (name.replace(/[\.\/]/g, '/')) + (g.option.compress ? '.js' : '.org.js');
    };
    modules = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        m = arguments[_i];
        _results.push(m);
      }
      return _results;
    }).apply(this, arguments);
    scripts = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = modules.length; _i < _len; _i++) {
        s = modules[_i];
        _results.push(makePath(s));
      }
      return _results;
    })();
    _ref++;
    g.$script.apply(this, [scripts, id]);
    g.$script.ready(id, done);
    cb = function(callback) {
      return _callbacks.push(function() {
        var module, shortcuts;
        shortcuts = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = modules.length; _i < _len; _i++) {
            module = modules[_i];
            _results.push(_resolve(module));
          }
          return _results;
        })();
        return (callback || function() {}).apply(g, shortcuts);
      });
    };
    return cb;
  };
  g.ready = function(fn) {
    if (typeof fn !== 'function') {
      return _ready && _stack.length === 0;
    }
    if (g.ready()) {
      return fn.apply(g);
    } else {
      return _stack.unshift(fn);
    }
  };
  evil = eval;
  evil(g.tag.innerHTML);
  return g;
})();
