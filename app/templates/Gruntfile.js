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

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'})
                ]
            },
            dist: {
                src: '<%%= app %>/css/app.css'
            }
        },

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
                tasks: ['sass', 'postcss']
            },
            sass: {
                files: '<%%= app %>/scss/**/*.scss',
                tasks: ['sass', 'postcss']
            },
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
                    '<%%= app %>/**/*.html'
                ],
                exclude: [
                    'modernizr',<% if (fontAwesome) { %>
                    'font-awesome',<% } %>
                    'jquery-placeholder',
                    'foundation'
                ]
            }
        }

    });

    grunt.registerTask('compile-sass', ['sass', 'postcss']);
    grunt.registerTask('bower-install', ['wiredep']);
    grunt.registerTask('default', ['compile-sass', 'bower-install', 'connect:app', 'watch']);
    grunt.registerTask('validate-js', ['jshint']);
    grunt.registerTask('server-dist', ['connect:dist']);
    grunt.registerTask('publish', ['compile-sass', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);

};
