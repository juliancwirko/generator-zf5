'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: 'app',
		dist: 'dist',

		sass: {<% if (!compass) { %>
			options: {
				includePaths: ['<%%= app %>/bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'extended'
				},
				files: {
					'<%%= app %>/css/app.css': '<%%= app %>/scss/app.scss'
				}
			}<% } else { %>
			dist: {
				options: {
					style: 'expanded', // expanded or nested or compact or compressed
					loadPath: '<%%= app %>/bower_components/foundation/scss',
					compass: true,
					quiet: true
				},
				files: {
					'<%%= app %>/css/app.css': '<%%= app %>/scss/app.scss'
				}
			}<% } %>
		},

		<% if (jade) { %>
		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: false
					}
				},
				files: [{
					expand: true,
					cwd: '<%%= app %>/jade/',
					src: ['**/*.jade', '!partials/**'],
					ext: '.html',
					dest: '<%%= app %>/'
				}]
			}
		},<% } %>

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%%= app %>/js/**/*.js'
			]
		},

		clean: {
			dist: {
				src: ['<%%= dist %>/*']
			},
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%%= app %>/',
					src: ['fonts/**', '**/*.html', '!**/*.scss', '!bower_components/**'],
					dest: '<%%= dist %>/'
				}<% if (fontAwesome) { %> , {
					expand: true,
					flatten: true,
					src: ['<%%= app %>/bower_components/font-awesome/fonts/**'],
					dest: '<%%= dist %>/fonts/',
					filter: 'isFile'
				} <% } %>]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%%= app %>/images/',
					src: ['**/*.{jpg,gif,svg,jpeg,png}'],
					dest: '<%%= dist %>/images/'
				}]
			}
		},
		
		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%%= app %>/index.html'],
			options: {
				dest: '<%%= dist %>'
			}
		},

		usemin: {
			html: ['<%%= dist %>/**/*.html', '!<%%= app %>/bower_components/**'],
			css: ['<%%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%%= dist %>']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: '<%%= app %>/scss/**/*.scss',
				tasks: ['sass']
			},<% if (jade) { %>
			jade: {
				files: '<%%= app %>/jade/**/*.jade',
				tasks: ['jade']
			},<% } %>
			livereload: {
				files: ['<%%= app %>/**/*.html', '!<%%= app %>/bower_components/**', '<%%= app %>/js/**/*.js', '<%%= app %>/css/**/*.css', '<%%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		},

		connect: {
			app: {
				options: {
					port: 9000,
					base: '<%%= app %>/',
					open: true,
					livereload: true,
					hostname: '127.0.0.1'
				}
			},
			dist: {
				options: {
					port: 9001,
					base: '<%%= dist %>/',
					open: true,
					keepalive: true,
					livereload: false,
					hostname: '127.0.0.1'
				}
			}
		},

		wiredep: {
			target: {
				src: [
					'<%%= app %>/**/*.html',
					'<%%= app %>/jade/**/*.jade'
				],
				exclude: [
					'modernizr',<% if (fontAwesome) { %>
					'font-awesome',<% } %>
					'jquery-placeholder',
					'jquery.cookie',
					'foundation'
				]
			}
		}
		
	});

	<% if (compass) { %>
	grunt.loadNpmTasks('grunt-contrib-sass');<% } else { %>
	grunt.loadNpmTasks('grunt-sass');<% } %>
	<% if (jade) { %>
	grunt.loadNpmTasks('grunt-contrib-jade');<% } %>
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-newer');

	<% if (jade) { %>grunt.registerTask('compile-jade', ['jade']);<% } %>
	grunt.registerTask('compile-sass', ['sass']);
	grunt.registerTask('bower-install', ['wiredep']);
	<% if (jade) { %>
	grunt.registerTask('default', ['compile-jade', 'compile-sass', 'bower-install', 'connect:app', 'watch']);<% } else { %>
	grunt.registerTask('default', ['compile-sass', 'bower-install', 'connect:app', 'watch']);<% } %>
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);
	<% if (jade) { %>
	grunt.registerTask('publish', ['compile-jade', 'compile-sass', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);<% } else { %>
	grunt.registerTask('publish', ['compile-sass', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);<% } %>

};