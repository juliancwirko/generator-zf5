'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);


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
		
		<% if (autoprefixer) { %>
		autoprefixer: {
			options: {
		        browsers: ['last 2 version', 'ie 8', 'ie 9']
	      		},
		      all: {
		        src: ['<%= app %>/css/app.css']
			}
		},<% } %>

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
					cwd: '<%%= app %>/',
					src: ['**/*.jade', '!**/header.jade', '!**/footer.jade'],
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
				tasks: ['sass'	<% if (autoprefixer) { %> ,'autoprefixer'  <% } %>]
			},<% if (jade) { %>
			jade: {
				files: '<%%= app %>/**/*.jade',
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
				src: [<% if (jade) { %>
					'<%%= app %>/**/*.jade'<% } else { %>
					'<%%= app %>/**/*.html'<% } %>
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

	<% if (jade) { %>grunt.registerTask('compile-jade', ['jade']);<% } %>
	grunt.registerTask('compile-sass', ['sass']);
	<% if (autoprefixer) { %>grunt.loadNpmTasks('grunt-autoprefixer');<% } %>
	grunt.registerTask('bower-install', ['wiredep']);
	<% if (jade) { %>
	grunt.registerTask('default', ['compile-jade', 'compile-sass', 'bower-install', 'connect:app', 'watch']);<% } else { %>
	grunt.registerTask('default', ['compile-sass'<% if (autoprefixer) { %> ,'autoprefixer'<% } %>, 'bower-install', 'connect:app', 'watch']);<% } %>
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);
	<% if (jade) { %>
	grunt.registerTask('publish', ['compile-jade', 'compile-sass', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);<% } else { %>
	grunt.registerTask('publish', ['compile-sass'<% if (autoprefixer) { %> ,'autoprefixer'<% } %>, 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);<% } %>

};
