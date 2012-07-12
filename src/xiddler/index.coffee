http = require 'http'
proxy = require 'http-proxy'
spawn = require('child_process').spawn
nstore = require 'nstore'
session = nstore.new 'var/session.db'
{WebUI} = require './webui'

class Xiddler
  NETWORK = 'Ethernet'
  PROXY_PORT = 8000
  UI_PORT = 9999

  sh = (cmd, options=[], callback)->
    proc = spawn cmd, options
    proc.on 'exit', (status)-> callback?() if status is 0
    proc

  netset = (args, callback)->
    sh 'networksetup', args, callback

  constructor: ->
    @ui = new WebUI()

  run: ->
    # the proxy listener
    server = proxy.createServer 9000, 'localhost'
    server.listen 8000
    console.log 'proxy server ready on localhost:8000'

    # logic of proxy behavior
    dispatcher = http.createServer (req, res)->
      res.writeHead 200, 'Content-Type': 'text/plain'
      res.write 'Hello, world'
      res.end()
    dispatcher.listen 9000

    @startWebUI()

    # setup network to use created proxy server
    netset ['-setwebproxy', NETWORK, 'localhost', PROXY_PORT], ->
      netset ['-setproxybypassdomains', NETWORK, '*.local', '169.254/16', 'localhost'], ->
        netset ['-setwebproxystate', NETWORK, 'on'], ->
          console.log 'enabled proxy localhost:8000'

    # disable proxy on program quit
    process.on 'SIGINT', ->
      sh 'networksetup', ['-setwebproxystate', 'Ethernet', 'off']
      process.exit()

  startWebUI: ->
    @ui.listen UI_PORT
    console.log "listening web ui on port #{UI_PORT}"

  backupProxySetting: ->
    netset ['-getproxybypassdomains']

  restoreProxySetting: ->
    # TODO: force disable web ui page
    netset ['-setwebproxystate', NETWORK, 'off'], ->
      process.exit()

exports.Xiddler = Xiddler
