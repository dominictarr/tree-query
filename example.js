var $ = require('./')


$(".../node_modules/*/package.json")
.readFile(JSON.parse)
.map(function (e) {return {name: e.name, version: e.version}})
.unique('name')
.json()

