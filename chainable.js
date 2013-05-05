
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
      var args = [].slice.call(arguments)
      this._chain.push(fun.apply(null, args))
      return this
    }
  }

  enchainAll(all)

  return function () {
    function go () {
      var chain = go._chain
      var pipeline = chain.shift()
      while(chain.length)
        pipeline = chain.shift()(pipeline)
      return pipeline
    }
    go._chain = []
    go.__proto__ = methods

    defaults.apply(go, arguments)

    return go
  }
}
