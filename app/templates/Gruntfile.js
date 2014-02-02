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
				'app/<%= ProjectName %>_template/js/**/*.js',
				'app/<%= CommonDirName %>/js/**/*.js'
			]<% } else { %>
			all: [
				'Gruntfile.js',
				'app/js/**/*.js'
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
					src: ['images/**', 'fonts/**', '!**/*.scss'],
					dest: 'dist/<%= CommonDirName %>'
				}, {
					expand: true,
					cwd:'app/<%= ProjectName %>_template',
					src: ['images/**', 'fonts/**', '!**/*.scss'],
					dest: 'dist/<%= ProjectName %>_template'
				}<% if (fontAwesome) { %> , {
					expand: true,
					flatten: true,
					src: ['app/bower_components/font-awesome/fonts/**'],
					dest: 'dist/<%= CommonDirName %>/fonts/',
					filter: 'isFile'
				} <% } %>]
			},
		},<% } else { %>
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'app/',
					src: ['images/**', 'fonts/**', '**/*.html', '!**/*.scss', '!bower_components/**'],
					dest: 'dist/'
				}<% if (fontAwesome) { %> , {
					expand: true,
					flatten: true,
					src: ['app/bower_components/font-awesome/fonts/**'],
					dest: 'dist/fonts/',
					filter: 'isFile'
				} <% } %>]
			},
		},<% } %>

		uncss: {
			dist: {
				files: {<% if (projectTemplate) { %>
					'.tmp/concat/<%= CommonDirName %>/css/app.min.css': ['app/**/*.html', '!app/bower_components/**']<% } else { %>
					'.tmp/concat/css/app.min.css': ['app/**/*.html', '!app/bower_components/**']<% } %>
				}
			}
		},
		
		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['app/**/*.html', '!app/bower_components/**'],
			options: {
				dest: 'dist'
			}
		},

		usemin: {
			html: ['dist/**/*.html', '!app/bower_components/**'],<% if (projectTemplate) { %>
			css: ['dist/<%= ProjectName %>_template/css/**/*.css', 'dist/<%= CommonDirName %>/css/**/*.css'],<% } else { %>
			css: ['dist/css/**/*.css'],<% } %>
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
				files: ['app/<%= CommonDirName %>/scss/**/*.scss', 'app/<%= ProjectName %>_template/scss/**/*.scss'],<% } else { %>
				files: 'app/scss/**/*.scss',<% } %>
				tasks: ['sass']
			},
			livereload: {<% if (projectTemplate) { %>
				files: ['app/**/*.html', '!app/bower_components/**', 'app/<%= CommonDirName %>/js/**/*.js', 'app/<%= ProjectName %>_template/js/**/*.js', 'app/<%= CommonDirName %>/css/**/*.css', 'app/<%= ProjectName %>_template/css/**/*.css', 'app/<%= CommonDirName %>/images/**/*.{jpg,gif,svg,jpeg,png}', 'app/<%= ProjectName %>_template/images/**/*.{jpg,gif,svg,jpeg,png}'],<% } else { %>
				files: ['app/**/*.html', '!app/bower_components/**', 'app/js/**/*.js', 'app/css/**/*.css', 'app/images/**/*.{jpg,gif,svg,jpeg,png}'],<% } %>
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
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.registerTask('build', ['sass']);
	grunt.registerTask('default', ['build', 'connect:app', 'watch']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);
	grunt.registerTask('publish', ['clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'concat', 'uncss', 'cssmin', 'uglify', 'usemin']);

};