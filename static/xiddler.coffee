g.use('$', 'jquery-layout', 'slick.grid', 'backbone') ->

  mvc = Backbone.noConflict()

  {Model, Collection, View} = mvc

  class Request extends Model
    defaults:
      url: ''
      method: 'GET'
      headers: {}

  class Response extends Model
    defaults:
      url: ''
      headers: {}
      body: ''

  class Log extends Collection
    model: Request

  class LogPane extends View
    initialize: ->
      @collection = new Log()

  class Xiddler extends View
