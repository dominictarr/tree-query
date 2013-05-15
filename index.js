#! /usr/bin/env node
var pull = require('pull-stream')
var pfs  = require('pull-fs')
var glob = require('pull-glob')
var chainable = require('./chainable')

var fs = require('fs')

function log () {
  return pull.drain(console.log)
}

var simple = {
  log: log,
  stdout: log,
  json: function (name, vName) {
    var first = true, next = ''

    return pull.drain(function (e) {
      if(!first)
        console.log(next + ',')

      var value = JSON.stringify(vName ? e[vName] : e, null, 2)
      next = name ? JSON.stringify(e[name]) +': ' + value : value

      if(first)
        next = (name ? '{' : '[') + next

      first = false
    }, function (err) {
      if(first)
        next = (name ? '{' : '[') + next
      console.log(next + (name ? '}' : ']'))
    })
  },
  stat: function () {
    return pull.asyncMap(function (f, cb) {
      fs.stat(f, cb)
    })
  }
}

var methods = [
  pull, pfs, {glob: glob}, simple,
]

var $ = module.exports = chainable(methods, function (x, y) {
  if(Array.isArray(x))
    this.values(x)
  else if(x && 'object' === typeof v)
    this.values(x)
  else if('function' === typeof x)
    this.infinite(x)
  else if('number' === typeof x)
    this.count(x)
  else if('string' === typeof x)
    this.glob(x)
})

if(!module.parent) {
  eval(process.argv[2])
}
