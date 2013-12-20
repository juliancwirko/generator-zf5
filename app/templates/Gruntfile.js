'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				includePaths: ['bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'extended'
				},
				files: {
					'app/css/app.css': 'app/scss/app.scss'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'app/js/{,*/}*.js'
			]
		},

		clean: {
			dist: {
				src: ['dist/*']
			},
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					src: ['app/*.html'],
					dest: 'dist/',
					filter: 'isFile'
				}, {
					expand: true,
					src: ['app/js/**', 'app/css/**', 'app/images/**', 'app/fonts/**', '!app/scss/**'],
					dest: 'dist/'
				}, {
					expand: true,
					flatten: true,
					src: ['bower_components/jquery/jquery.min.js', 'bower_components/modernizr/modernizr.js'],
					dest: 'dist/js/vendor/',
					filter: 'isFile'
				}, {
					expand: true,
					flatten: true,
					src: ['bower_components/foundation/js/foundation.min.js'],
					dest: 'dist/js/foundation/',
					filter: 'isFile'
				}<% if (fontAwesome) { %> , {
					expand: true,
					flatten: true,
					src: ['bower_components/font-awesome/fonts/**'],
					dest: 'dist/fonts/',
					filter: 'isFile'
				},
				{
					expand: true,
					flatten: true,
					src: ['bower_components/font-awesome/css/font-awesome.min.css'],
					dest: 'dist/css/',
					filter: 'isFile'
				}<% } %>]
			},
		},

		useminPrepare: {
			html: 'app/*.html',
			options: {
				dest: 'dist'
			}
		},

		usemin: {
			html: ['dist/*.html'],
			css: ['dist/css/*.css'],
			options: {
				dirs: ['dist']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			sass: {
				files: 'app/scss/{,*/}*.scss',
				tasks: ['sass']
			},
			livereload: {
				files: ['app/*.html', 'app/js/{,*/}*.js', 'app/css/{,*/}*.css', 'app/images/{,*/}*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.registerTask('build', ['sass']);
	grunt.registerTask('default', ['build', 'watch']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('publish', ['clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'usemin']);

};