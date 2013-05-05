# tree-query

like jQuery, but on directory trees.

## Example

Find all the modules node could require from current dir,
and print their name and version.

``` js
var $ = require('tree-query')

$('.../node_module/*/package.json')
  .read(JSON.parse)
  .unique('name')
  .map(function (e) {
    return {name:e.name, version:e.version}
  })
  .drain(console.log)
```

and many other extremely terse expressions!

## see also

mostly this just wraps some pull-stream modules in a chainable api.

  * [pull-stream](https://github.com/dominictarr/pull-stream)
  * [pull-fs](https://github.com/dominictarr/pull-fs)
  * [pull-glob](https://github.com/dominictarr/pull-glob)

## coming soon

fs.watch events...

## License

MIT
