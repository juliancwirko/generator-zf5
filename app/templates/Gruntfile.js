'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				includePaths: ['app/bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'extended'
				},<% if (projectTemplate) { %>
				files: {
					'app/<%= CommonDirName %>/css/app.css': 'app/<%= CommonDirName %>/scss/app.scss',
					'app/<%= ProjectName %>_template/css/<%= ProjectName %>.css': 'app/<%= ProjectName %>_template/scss/<%= ProjectName %>.scss'
				}<% } else { %>
				files: {
					'app/css/app.css': 'app/scss/app.scss'
				}<% } %>
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},<% if (projectTemplate) { %>
			all: [
				'Gruntfile.js',
				'app/<%= ProjectName %>_template/js/{,*/}*.js'
			]<% } else { %>
			all: [
				'Gruntfile.js',
				'app/js/{,*/}*.js'
			]<% } %>
		},

		clean: {
			dist: {
				src: ['dist/*']
			},
		},<% if (projectTemplate) { %>
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'app/',
					src: ['**/*.html', '!bower_components/**'],
					dest: 'dist/',
					filter: 'isFile'
				}, {
					expand: true,
					cwd:'app/<%= CommonDirName %>',
					src: ['css/**', 'js/**', 'images/**', 'fonts/**', '!**/*.scss'],
					dest: 'dist/<%= CommonDirName %>'
				}, {
					expand: true,
					cwd:'app/<%= ProjectName %>_template',
					src: ['css/**', 'js/**', 'images/**', 'fonts/**', '!**/*.scss'],
					dest: 'dist/<%= ProjectName %>_template'
				}, {
					expand: true,
					flatten: true,
					src: ['app/bower_components/jquery/jquery.min.js', 'app/bower_components/modernizr/modernizr.js', 'app/bower_components/foundation/js/foundation.min.js'],
					dest: 'dist/<%= CommonDirName %>/js/vendor/',
					filter: 'isFile'
				}, <% if (fontAwesome) { %> , {
					expand: true,
					flatten: true,
					src: ['app/bower_components/font-awesome/fonts/**'],
					dest: 'dist/<%= CommonDirName %>/fonts/',
					filter: 'isFile'
				},
				{
					expand: true,
					flatten: true,
					src: ['app/bower_components/font-awesome/css/font-awesome.min.css'],
					dest: 'dist/<%= CommonDirName %>/css/',
					filter: 'isFile'
				}<% } %>]
			},
		},<% } else { %>
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'app/',
					src: ['css/**', 'js/**', 'images/**', 'fonts/**', '**/*.html', '!**/*.scss', '!bower_components/**'],
					dest: 'dist/'
				}, {
					expand: true,
					flatten: true,
					src: ['app/bower_components/jquery/jquery.min.js', 'app/bower_components/modernizr/modernizr.js'],
					dest: 'dist/js/vendor/',
					filter: 'isFile'
				}, {
					expand: true,
					flatten: true,
					src: ['app/bower_components/foundation/js/foundation.min.js'],
					dest: 'dist/js/foundation/',
					filter: 'isFile'
				}<% if (fontAwesome) { %> , {
					expand: true,
					flatten: true,
					src: ['app/bower_components/font-awesome/fonts/**'],
					dest: 'dist/fonts/',
					filter: 'isFile'
				},
				{
					expand: true,
					flatten: true,
					src: ['app/bower_components/font-awesome/css/font-awesome.min.css'],
					dest: 'dist/css/',
					filter: 'isFile'
				}<% } %>]
			},
		},<% } %>

		useminPrepare: {
			html: 'app/*.html',
			options: {
				dest: 'dist'
			}
		},

		usemin: {
			html: ['dist/*.html'],<% if (projectTemplate) { %>
			css: ['dist/<%= ProjectName %>_template/css/*.css', 'dist/<%= CommonDirName %>/css/*.css'],<% } else { %>
			css: ['dist/css/*.css'],<% } %>
			options: {
				dirs: ['dist']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {<% if (projectTemplate) { %>
				files: ['app/<%= CommonDirName %>/scss/{,*/}*.scss', 'app/<%= ProjectName %>_template/scss/{,*/}*.scss'],<% } else { %>
				files: 'app/scss/{,*/}*.scss',<% } %>
				tasks: ['sass']
			},
			livereload: {<% if (projectTemplate) { %>
				files: ['app/*.html', 'app/<%= CommonDirName %>/js/{,*/}*.js', 'app/<%= ProjectName %>_template/js/{,*/}*.js', 'app/<%= CommonDirName %>/css/{,*/}*.css', 'app/<%= ProjectName %>_template/css/{,*/}*.css', 'app/<%= CommonDirName %>/images/{,*/}*.{jpg,gif,svg,jpeg,png}', 'app/<%= ProjectName %>_template/images/{,*/}*.{jpg,gif,svg,jpeg,png}'],<% } else { %>
				files: ['app/*.html', 'app/js/{,*/}*.js', 'app/css/{,*/}*.css', 'app/images/{,*/}*.{jpg,gif,svg,jpeg,png}'],<% } %>
				options: {
					livereload: true
				}
			}
		},

		connect: {
			app: {
				options: {
					port: 9000,
					base: 'app/',
					livereload: true
				}
			},
			dist: {
				options: {
					port: 9001,
					base: 'dist/',
					keepalive: true,
					livereload: false
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.registerTask('build', ['sass']);
	grunt.registerTask('default', ['build', 'connect:app', 'watch']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);
	grunt.registerTask('publish', ['clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'usemin']);

};