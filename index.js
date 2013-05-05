#! /usr/bin/env node
var pull = require('pull-stream')
var pfs  = require('pull-fs')
var glob = require('pull-glob')
var chainable = require('./chainable')

var methods = [
  pull, pfs, {glob: glob},
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
