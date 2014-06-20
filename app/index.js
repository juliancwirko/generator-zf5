'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var Zf5Generator = yeoman.generators.Base.extend({

	init: function () {
		this.pkg = require('../package.json');
		this.config.save();

		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.installDependencies();
			}
		});
	},

	askForFontAwesome: function () {
		var cb = this.async();

		// have Yeoman greet the user.
		this.log(this.yeoman);

		this.log(chalk.bold.blue('=================='));
		this.log(chalk.bold.blue(' Yo Foundation 5!'));
		this.log(chalk.bold.blue('=================='));

		var prompts = {
			type: 'confirm',
			name: 'fontAwesome',
			message: 'Would you like to include Font Awesome? (Font Awesome gives you scalable vector icons..)',
			default: true
		};

		this.prompt(prompts, function (props) {
			this.fontAwesome = props.fontAwesome;

			cb();
		}.bind(this));
	},

	askForCompass: function () {
		var cb = this.async();

		var prompts = {
			type: 'confirm',
			name: 'compass',
			message: 'Would you like to use Scss (with Compass)? (default: Scss with Libsass)',
			default: false
		};

		this.prompt(prompts, function (props) {
			this.compass = props.compass;

			cb();
		}.bind(this));
	},

	askForJade: function () {
		var cb = this.async();

		var prompts = {
			type: 'confirm',
			name: 'jade',
			message: 'Would you like to use Jade? (templating engine)',
			default: true
		};

		this.prompt(prompts, function (props) {
			this.jade = props.jade;

			cb();
		}.bind(this));
	},

	app: function () {
		this.mkdir('dist');
		this.mkdir('app');
		this.template('bower.json', 'bower.json');
		this.template('package.json', 'package.json');
		this.template('Gruntfile.js', 'Gruntfile.js');
		this.copy('.jshintrc', '.jshintrc');
		this.copy('.bowerrc', '.bowerrc');
		this.copy('gitignore', '.gitignore');
		if (this.jade) {
			this.mkdir('app/jade');
			this.mkdir('app/jade/partials');
			this.template('jade/index.jade', 'app/jade/index.jade');
			this.template('jade/partials/header.jade', 'app/jade/partials/header.jade');
			this.copy('jade/partials/footer.jade', 'app/jade/partials/footer.jade');
		} else {
			this.template('index.html', 'app/index.html');
		}
		this.mkdir('app/fonts');
		this.mkdir('app/images');
		this.mkdir('app/js');
		this.mkdir('app/css');
		this.mkdir('app/scss');
		this.copy('scss/app.scss', 'app/scss/app.scss');
		this.copy('scss/_settings.scss', 'app/scss/_settings.scss');
		this.copy('scss/_appstyles.scss', 'app/scss/_appstyles.scss');
		this.copy('js/app.js', 'app/js/app.js');
		this.copy('css/template_override.css', 'app/css/app_override.css');
	}

});

module.exports = Zf5Generator;
