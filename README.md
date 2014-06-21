# generator-zf5

[Yeoman](http://yeoman.io) generator for [Zurb Foundation 5](http://foundation.zurb.com/).

[![NPM](https://nodei.co/npm/generator-zf5.png?downloads=true)](https://nodei.co/npm/generator-zf5/)

## Yo Foundation 5!
* Sass compiling
* Jade templating engine (option)
* Publishing to dist directory
* Server with LiveReload (127.0.0.1:9000)
* Bower install
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

## Grunt tasks:

..runs project (into dist directory)
```
$ grunt (compile Jade, compile Sass, bower install, livereload, watch)
```
..for publishing project (into dist directory)
```
$ grunt publish (compile Jade, compile Sass, validate-js, copy, concatenation, minifications)
```
..for dist directory preview (server on 127.0.0.1:9001)
```
$ grunt server-dist
```

### Other Grunt tasks

..for validating javascript
```
$ grunt validate-js
```
..for injecting bower libraries (also in default grunt task)
```
$ grunt bower-install
```
..for compiling Sass files
```
$ grunt compile-sass
```
..for compiling Jade files
```
$ grunt compile-jade
```

### Ruby Sass with Compass or Node Sass (Libsass)

From version 0.7.0 you can use Ruby version of Sass with Compass. You can choose this option after 'yo zf5'. By default you will be using Node version whith is faster but there are some incompatibilities with newer Sass versions (for actual version of Foundation it is ok but if you want use new Sass capabilities you should use Ruby version). If you want to use Ruby version first of all you need to install compass by 'gem install compass' (it will install Sass gem too).

You don't need to use the config.rb file, all is configured in Gruntfile.js (Sass block) If you have any problems with using Sass with Compass it is good to uninstall any of your Sass gems and Compass gems and install only Compass gem again. It will fetch proper version of Sass gem.

Ruby Sass config info: <a href="https://github.com/gruntjs/grunt-contrib-sass">https://github.com/gruntjs/grunt-contrib-sass</a>

Node Sass config info: <a href="https://github.com/sindresorhus/grunt-sass">https://github.com/sindresorhus/grunt-sass</a>

Please test this and send issues if any.

### Jade templating engine

From version 0.8.0 you can use Jade templating engine (option). It gives you clean and simple html syntax and (whats important) it allows you to use partials includes like header or footer. Example:
````
html(class="no-js", lang="en")
    include partials/header
    body
        div.row
            div(class="small-12 columns panel radius")
                h1 Yo Foundation 5!
                h2(class="text-right")
                    a(href="https://github.com/juliancwirko/generator-zf5")
                        i(class="fa fa-twitter")
        include partials/footer
````
More about Jade: [http://jade-lang.com/](http://jade-lang.com/)

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
- if you use Compass.. place your mixin includes after Foundation scss partials - [more info](https://github.com/juliancwirko/generator-zf5/issues/18)
- if you use Jade templating remember to place at least header.jade and footer.jade in main app folder - this is needed for bower install injections

You can test it and tell me please if something is not working.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

### License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

Maybe someone (English speaker) would like to prepare tutorial for zf5 generator? I will be very thankful :)

### Contact

[@juliancwirko](https://twitter.com/JulianCwirko) | [julian.cwirko@gmail.com](mailto:julian.cwirko@gmail.com)

### Changelog

#### 0.8.0 (--.06.2014)

- Foundation 5.3 adjustments
- Jade templating engine (option)

#### 0.7.2 (31.05.2014)

- Foundation 5.2.3 adjustments

#### 0.7.1 (23.05.2014)

- Font Awesome update
- Deps update

#### 0.7.0 (02.05.2014)

- Ruby Sass with Compass as an option
- Imagemin

#### 0.6.4 (04.04.2014)

- Foundation 5.2.2 adjustments

#### 0.6.3 (21.03.2014)

- grunt useminPrepare - based only on one file - index.html (prevents multiple the same operations if there are many html files)

#### 0.6.2 (20.03.2014)

- Foundation JavaScript file - separation into components
- 'connect' hostname - back to 127.0.0.1

#### 0.6.1 (14.03.2014)

- Foundation 5.2.1 adjustments

#### 0.6.0 (8.03.2014)

- yeoman-generator 0.16.0 cleanup [http://yeoman.io/blog/cleanup.html]
- template folder option removed
- grunt-bower-install added
- Foundation 5.2 cleanup