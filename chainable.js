var pull = require('pull-stream')

module.exports = function (all, defaults) {
  var methods = function () {}

  function enchainAll(all) {
    if(Array.isArray(all))
      return all.forEach(enchainAll)

    for(var k in all)
      methods[k] = enchain(all[k])
  }

  function enchain (fun) {
    return function () {
      var stream = fun.apply(null, arguments)
      if(!this._stream)
        this._stream = stream
      else
        this._stream = pull(this._stream, stream)
      return this
    }
  }

  enchainAll(all)

  return function () {
    function go (read) {
      return go._stream.call(read)        
    }
    go._chain = []
    go._stream
    go.__proto__ = methods

    defaults.apply(go, arguments)

    return go
  }
}
