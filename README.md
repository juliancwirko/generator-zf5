# generator-zf5

[Yeoman](http://yeoman.io) generator for [Zurb Foundation 5](http://foundation.zurb.com/).

### Learn more about it (blog post):
[Foundation 5 and Yeoman generator-zf5](http://julian.io/foundation-5-and-yeoman/)

### Important note:

**Default option here will be Sass with Libsass (for now). But you can choose Ruby version on startup.**

[![NPM](https://nodei.co/npm/generator-zf5.png?downloads=true)](https://nodei.co/npm/generator-zf5/)

[![NPM](https://nodei.co/npm-dl/generator-zf5.png?height=2)](https://nodei.co/npm/generator-zf5/)

## Yo Foundation 5!
* Sass compiling
* autoprefixer (app.css file)
* Publishing to dist directory
* Server with LiveReload (127.0.0.1:9000)
* Bower install
* JSHint
* Custom Modernizr build based on your features usage
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

## Grunt tasks:

run project
(compile Sass, bower install, livereload (server on 127.0.0.1:9000), watch)
```
$ grunt
```
publishing project (into dist directory)
(compile Sass, validate-js, copy, concatenation, minifications)
```
$ grunt publish
```
dist directory preview (server on 127.0.0.1:9001)
```
$ grunt server-dist
```

### Other Grunt tasks (if you want to use it)

..for validating javascript
```
$ grunt validate-js
```
..for injecting bower libraries (also in default grunt task)
```
$ grunt bower-install
```
..for compiling Sass files + autoprefixer on app.css file
```
$ grunt compile-sass
```

### Ruby Sass with Compass or Node Sass (Libsass)

From version 0.7.0 you can use Ruby version of Sass with Compass. If you want to use Ruby version first of all you need to install compass by 'gem install compass' (it will install Sass gem too).

You don't need to use the config.rb file, all is configured in Gruntfile.js (Sass block). There will be also Compass imports in _appstyles.scss (You can modify it). If you have any problems with using Sass with Compass it is good to uninstall any of your Sass gems and Compass gems and install only Compass gem again. It will fetch proper version of Sass gem.

Ruby Sass config info: <a href="https://github.com/gruntjs/grunt-contrib-sass">https://github.com/gruntjs/grunt-contrib-sass</a>

You can also use Libsass version (default) which is very fast.

Node Sass config info: <a href="https://github.com/sindresorhus/grunt-sass">https://github.com/sindresorhus/grunt-sass</a>

Please test this and send issues if any.

### LiveReload

For LiveReload call 'grunt' (watching) command and go to http://127.0.0.1:9000

### Usemin

Read more about [grunt-usemin](https://github.com/yeoman/grunt-usemin)

### Bower-install

Now you can install your libraries much faster. Example:
```
bower search magnific-popup
...
bower install magnific-popup --save
...
grunt bower-install
```
This should inject the proper js and css paths into your html files. But you should be careful and check what was injected.
'grunt publish' will then minify and concatenate them into a clean (libraries.min.css and libraries.min.js) files.
Instead of a 'bower install' with '--save' you can manualy edit the bower.json file and then run a 'grunt bower-install'. It is also included in the default task - 'grunt'.

## Tips

- Sometimes after new version is released if you have errors when running ````yo zf5```` You should run ````npm cache clean````
- If you have problems with permissions in Linux run this : ````sudo chown -R `whoami` ~/.npm````
- if you want you can delete not used javascript components in index.html file. All remaining components will be minified and concatenated into one foundation.min.js
- if you have problems with connection to http://127.0.0.1:9000 change 'hostname' in Gruntfile.js 'connect' config. Just add ```hostname: '[your hostname]'``` line to ```options: {...}```
- if you want you can delete unnecessary/unused Foundation components from main app.scss (it will be lightest main Foundation css file)
- place all your html files in the root folder (app) or you have to change assets paths (build etc.)
- grunt useminPrepare reference file is only index.html (prevents multiple the same operations) but all html files will be processed, so remember to keep the same usemin 'comments blocks' in all your html files (for now it is good to simply copy index.html, rename it and leave header and footer css and js inclusions with 'comments blocks')
- try to avoid situation when you have the same build blocks in two html files with different assets so (examples):

```
<!-- build:js js/mfpopup/mfpopup.min.js -->
    <script src="js/mfpopup/mfpopup.js"></script>
<!-- endbuild -->
```
and
```
<!-- build:css css/mfpopup/mfpopup.min.js -->
    <script src="js/mfpopup/mfpopup.js"></script>
    <script src="js/mfpopup/other_script.js"></script>
<!-- endbuild -->
```
you can add new ones

- always verify what 'grunt bower-install' injects
- You must look aut where you initialize your project. It is better to not initialize your projec in a subfolder next to .yo-rc.json because your files will land here and not in your subfolder from where you are initializing project
- if you use Compass.. place your mixin includes after Foundation scss partials - [more info](https://github.com/juliancwirko/generator-zf5/issues/18) (by default they are in _appstyles.scss)

You can test it and tell me please if something is not working.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

### License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

### Contact

[@juliancwirko](https://twitter.com/JulianCwirko) | [julian.cwirko@gmail.com](mailto:julian.cwirko@gmail.com)

### Changelog

..see [CHANGELOG.md](https://github.com/juliancwirko/generator-zf5/blob/master/CHANGELOG.md) file
