fs = require 'fs'
{spawn} = require 'child_process'

compile = (callback)->
  job = spawn 'coffee', ['-c', '-o', 'lib', 'src']
  job.stdout.pipe process.stdout
  job.stderr.pipe process.stderr
  job.on 'exit', (code)->
    callback?() if code is 0

copy = (src, dest, callback)->
  job = spawn 'cp', ['-r', src, dest]
  job.on 'error', console.log
  job.on 'exit', (code)->
    callback?() if code is 0

task 'build', 'Build lib/ from src/', ->
  console.log 'Building...'
  copy 'src/templates', 'lib'
  copy 'src/static', 'lib'
  compile -> console.log 'done'

task 'watch', 'Watch for source code changes', ->
  console.log 'watching changes for src directory'
  fs.watch 'src', (event, filename=null)->
    console.log 'found some changes...'
    invoke 'build'
