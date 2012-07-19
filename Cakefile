fs = require 'fs'
{spawn} = require 'child_process'

compile = (callback)->
  job = spawn 'coffee', ['-c', '-o', 'lib', 'src']
  job.stdout.pipe process.stdout
  job.stderr.pipe process.stderr
  job.on 'exit', (code)->
    callback?() if code is 0

task 'build' , 'Build lib/ from src/', ->
  compile()

