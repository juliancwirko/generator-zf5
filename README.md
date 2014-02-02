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

All Css files included in build (..)app.min.css(..) block will be uncss'ed, example:
```
<!-- build:css shared/css/app.min.css -->
	<link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.css">
	<link rel="stylesheet" href="shared/css/app.css">
<!-- endbuild -->
```

You will have one app.min.css with fontawesome and foundation app.css minified, concatenated, and uncss'ed.

Read more about [grunt-uncss](https://github.com/addyosmani/grunt-uncss) and [grunt-usemin](https://github.com/yeoman/grunt-usemin)

## Tips

- place all your html files in the root folder (app) or you have to change assets paths (build etc.)
- be careful with CSS files of third party plugins, place them outside the app.min.css build blocks (this file will be uncss'ed)
example:
```
<!-- build:css css/mfpopup/mfpopup.min.css -->
     <link rel="stylesheet" href="css/mfpopup/mfpopup.css">
<!-- endbuild -->
```
- try to avoid situation when you have the same build blocks in two html files with different assets so (examples):

```
<!-- build:js js/mfpopup/mfpopup.min.js -->
    <script src="js/mfpopup/mfpopup.js"></script>
<!-- endbuild -->
```
and
```
<!-- build:css css/mfpopup/mfpopup.min.css -->
    <script src="js/mfpopup/mfpopup.js"></script>
    <script src="js/mfpopup/other_script.js"></script>
<!-- endbuild -->
```
you can add new ones

- on start it is better to use standard version without template folder

You can test it and tell me please if something is not working.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

### License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

Maybe someone (English speaker) would like to prepare tutorial for zf5 generator? I will be very thankful :)

### Contact

[@juliancwirko](https://twitter.com/JulianCwirko) | [julian.cwirko@gmail.com](mailto:julian.cwirko@gmail.com)
