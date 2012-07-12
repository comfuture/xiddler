express = require 'express'

class WebUI
  constructor: ->
    @app = express.createServer()

    @app.get '/', (req, res)->
      res.send 'web ui ready'

  listen: (port=41661)->
    @app.listen port

exports.WebUI = WebUI
