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
					'app/<%= CommonDirName %>/css/app.css': 'app/<%= CommonDirName %>/scss/app.scss',
					'app/<%= ProjectName %>_template/css/<%= ProjectName %>.css': 'app/<%= ProjectName %>_template/scss/<%= ProjectName %>.scss'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'app/<%= ProjectName %>_template/js/{,*/}*.js'
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
					src: ['app/<%= CommonDirName %>/**', '!app/<%= CommonDirName %>/scss/**'],
					dest: 'dist/'
				}, {
					expand: true,
					src: ['app/<%= ProjectName %>_template/**', '!app/<%= ProjectName %>_template/scss/**'],
					dest: 'dist/'
				}, {
					expand: true,
					flatten: true,
					src: ['bower_components/jquery/jquery.min.js', 'bower_components/modernizr/modernizr.js'],
					dest: 'dist/<%= CommonDirName %>/js/vendor/',
					filter: 'isFile'
				}, {
					expand: true,
					flatten: true,
					src: ['bower_components/foundation/js/foundation.min.js'],
					dest: 'dist/<%= CommonDirName %>/js/foundation/',
					filter: 'isFile'
				}<% if (fontAwesome) { %> , {
					expand: true,
					flatten: true,
					src: ['bower_components/font-awesome/fonts/**'],
					dest: 'dist/<%= CommonDirName %>/fonts/',
					filter: 'isFile'
				},
				{
					expand: true,
					flatten: true,
					src: ['bower_components/font-awesome/css/font-awesome.min.css'],
					dest: 'dist/<%= CommonDirName %>/css/',
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
			css: ['dist/<%= ProjectName %>_template/css/*.css', 'dist/<%= CommonDirName %>/css/*.css'],
			options: {
				dirs: ['dist']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			sass: {
				files: ['app/<%= CommonDirName %>/scss/{,*/}*.scss', 'app/<%= ProjectName %>_template/scss/{,*/}*.scss'],
				tasks: ['sass']
			},
			livereload: {
				files: ['app/*.html', 'app/<%= CommonDirName %>/js/{,*/}*.js', 'app/<%= ProjectName %>_template/js/{,*/}*.js', 'app/<%= CommonDirName %>/css/{,*/}*.css', 'app/<%= ProjectName %>_template/css/{,*/}*.css', 'app/<%= CommonDirName %>/images/{,*/}*.{jpg,gif,svg,jpeg,png}', 'app/<%= ProjectName %>_template/images/{,*/}*.{jpg,gif,svg,jpeg,png}'],
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