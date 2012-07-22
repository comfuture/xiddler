http = require 'http'
proxy = require 'http-proxy'
spawn = require('child_process').spawn
nstore = require 'nstore'
session = nstore.new 'var/session.db'
{WebUI} = require './webui'
url = require 'url'
fs = require 'fs'

class Xiddler
  NETWORK = 'Wi-Fi' # 'Ethernet'
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
    proxyRouter = new proxy.RoutingProxy()
    proxyServer = http.createServer (req, res)->
      console.log req.url
      origin = url.parse req.url
      options =
        host: origin.hostname
        port: origin.port or 80
        path: origin.href.split(origin.host)[1]
        method: req.method
        headers: req.headers

      client = http.request options, (result)->
        res.writeHead result.statusCode, '', result.headers
        result.on 'data', (chunk)-> res.write chunk
        result.on 'end', -> res.end()
      
      req.on 'data', (chunk)-> client.write chunk
      req.on 'end', -> client.end()

      client.on 'error', -> res.end()
      client.end()
    proxyServer.listen 8000
    console.log 'proxy server ready on localhost:8000'

    # setup network to use created proxy server
    netset ['-setwebproxy', NETWORK, 'localhost', PROXY_PORT], =>
      netset ['-setproxybypassdomains', NETWORK, '*.local', '169.254/16', 'localhost'], =>
        netset ['-setwebproxystate', NETWORK, 'on'], =>
          console.log 'enabled proxy localhost:8000'
          @startWebUI()
          sh 'Open', ['http://localhost:9999']

    # disable proxy on program quit
    process.on 'SIGINT', ->
      sh 'networksetup', ['-setwebproxystate', NETWORK, 'off']
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
