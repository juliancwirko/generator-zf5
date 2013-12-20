'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var Zf5Generator = module.exports = function Zf5Generator(args, options, config) {
yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Zf5Generator, yeoman.generators.Base);

Zf5Generator.prototype.askForFontAwesome = function askForFontAwesome() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

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
}

Zf5Generator.prototype.askForTypeOfProject = function askForTypeOfProject() {
  var cb = this.async();

  var prompts = {
    type: 'confirm',
    name: 'ProjectOrNot',
    message: 'Do you want a separate template folder?',
    default: true
  };

  this.prompt(prompts, function (props) {
    this.ProjectOrNot = props.ProjectOrNot;

    cb();
  }.bind(this));
};

Zf5Generator.prototype.askForProjectDirs = function askForProjectDirs() {
  if (this.ProjectOrNot) {
    var cb = this.async();

    var prompts = [{
      type: 'input',
      name: 'ProjectName',
      message: 'Your Zurb Foundation project name:',
      default: 'project'
    },
    {
      type: 'input',
      name: 'CommonDirName',
      message: 'Common files directory name:',
      default: 'shared'
    }];

    this.prompt(prompts, function (props) {
      this.ProjectName = props.ProjectName;
      this.CommonDirName = props.CommonDirName;

      cb();
    }.bind(this));
  }
};

Zf5Generator.prototype.app = function app() {
    this.mkdir('dist');
    this.mkdir('app');
    this.template('bower.json', 'bower.json');
    this.copy('package.json', 'package.json');

  if (this.ProjectOrNot) {
    this.template('Gruntfile_proj.js', 'Gruntfile.js');
    this.copy('.jshintrc', '.jshintrc');
    this.template('index_proj.html', 'app/index.html');
    this.mkdir('app/'+this.CommonDirName);
    this.mkdir('app/'+this.CommonDirName+'/fonts');
    this.mkdir('app/'+this.CommonDirName+'/images');
    this.mkdir('app/'+this.CommonDirName+'/js');
    this.mkdir('app/'+this.CommonDirName+'/css');
    this.mkdir('app/'+this.CommonDirName+'/scss');
    this.mkdir('app/'+this.ProjectName+'_template');
    this.mkdir('app/'+this.ProjectName+'_template/fonts');
    this.mkdir('app/'+this.ProjectName+'_template/images');
    this.mkdir('app/'+this.ProjectName+'_template/css');
    this.mkdir('app/'+this.ProjectName+'_template/js');
    this.mkdir('app/'+this.ProjectName+'_template/scss');
    this.copy('scss/app.scss', 'app/'+this.CommonDirName+'/scss/app.scss');
    this.copy('scss/_settings.scss', 'app/'+this.CommonDirName+'/scss/_settings.scss');
    this.copy('scss/_template_settings.scss', 'app/'+this.ProjectName+'_template/scss/_'+this.ProjectName+'_settings.scss');
    this.template('js/template.js', 'app/'+this.ProjectName+'_template/js/'+this.ProjectName+'.js');
    this.template('scss/template.scss', 'app/'+this.ProjectName+'_template/scss/'+this.ProjectName+'.scss');
    this.copy('css/template_override.css', 'app/'+this.ProjectName+'_template/css/'+this.ProjectName+'_override.css');
  }
  else {
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('.jshintrc', '.jshintrc');
    this.template('index.html', 'app/index.html');
    this.mkdir('app/fonts');
    this.mkdir('app/images');
    this.mkdir('app/js');
    this.mkdir('app/css');
    this.mkdir('app/scss');
    this.copy('scss/app.scss', 'app/scss/app.scss');
    this.copy('scss/_settings.scss', 'app/scss/_settings.scss');
    this.copy('js/app.js', 'app/js/app.js');
    this.copy('css/template_override.css', 'app/css/app_override.css');
  }
};
