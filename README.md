# generator-zf5

[Yeoman](http://yeoman.io) generator for Zurb Foundation 5.

[![NPM](https://nodei.co/npm/generator-zf5.png?downloads=true)](https://nodei.co/npm/generator-zf5/)

## Yo Foundation 5!
* Sass compiling
* Publishing to dist directory
* Server with LiveReload (127.0.0.1:9000)
* JSHint
* Font Awesome (option)

## Getting Started

```
$ npm install -g yo
```

To install generator-zf5 from npm, run:

```
$ npm install -g generator-zf5
```

Finally, initiate the generator:

```
$ yo zf5
```

Grunt tasks:

..for validating javascript
```
$ grunt validate-js
```
..for compiling files
```
$ grunt build
```
..for watching (Sass, Server on 127.0.0.1:9000 with LiveReload)
```
$ grunt
```
..for publishing project (dist directory)
```
$ grunt publish
```
..for dist directory preview (server on 127.0.0.1:9001)
```
$ grunt server-dist
```

For LiveReload call 'grunt' (watching) command and go to http://127.0.0.1:9000.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

### License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

### Contact

[@juliancwirko](https://twitter.com/JulianCwirko) | [julian.cwirko@gmail.com](mailto:julian.cwirko@gmail.com)
