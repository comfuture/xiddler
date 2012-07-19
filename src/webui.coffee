express = require 'express'
underscore = require 'underscore'

class WebUI

  _ = underscore.noConflict()
  _.templateSettings =
    interpolate: /\{\{(.+?)\}\}/g
    evaluate: /\{%(.+?)%\}/g

  constructor: ->
    @app = express.createServer()
    @app.configure =>
      @app.use express.bodyParser()
      @app.use @app.router
      @app.use express.static __dirname + '/static'

      @app.set 'views', __dirname + '/templates'
      @app.set 'view options', layout: false
      @app.register '.html',
        compile: (src, options)->
          template = _.template src
          (context)-> template context

    @app.get '/', (req, res)->
      res.render 'index.html'

  listen: (port=41661)->
    @app.listen port

exports.WebUI = WebUI
