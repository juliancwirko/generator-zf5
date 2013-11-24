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

Zf5Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

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
};

Zf5Generator.prototype.app = function app() {
  this.mkdir('dist');
  this.mkdir(this.CommonDirName);
  this.mkdir(this.CommonDirName+'/images');
  this.mkdir(this.CommonDirName+'/js');
  this.mkdir(this.CommonDirName+'/css');
  this.mkdir(this.CommonDirName+'/scss');
  this.mkdir(this.ProjectName+'_template');
  this.mkdir(this.ProjectName+'_template/images');
  this.mkdir(this.ProjectName+'_template/css');
  this.mkdir(this.ProjectName+'_template/js');
  this.mkdir(this.ProjectName+'_template/scss');

  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('index.html', 'index.html');
  this.copy('bower.json', 'bower.json');
  this.copy('package.json', 'package.json');
  this.copy('scss/app.scss', this.CommonDirName+'/scss/app.scss');
  this.copy('scss/_settings.scss', this.CommonDirName+'/scss/_settings.scss');
  this.copy('scss/_template_settings.scss', this.ProjectName+'_template/scss/_'+this.ProjectName+'_settings.scss');
  this.copy('js/app.js', this.CommonDirName+'/js/app.js');
  this.template('js/template.js', this.ProjectName+'_template/js/'+this.ProjectName+'.js');
  this.template('scss/template.scss', this.ProjectName+'_template/scss/'+this.ProjectName+'.scss');
  this.copy('css/template_override.css', this.ProjectName+'_template/css/'+this.ProjectName+'_override.css');
};
