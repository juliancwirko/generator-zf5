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
          'css/app.css': 'scss/app.scss'
        }        
      }
    },

    clean: {
      dist: {
        src: [ 'dist/*' ]
      },
    },

    copy: {
      dist: {
        files: [
          {expand: true, src: ['*.html'], dest: 'dist/', filter: 'isFile'},
          {expand: true, src: ['js/**', 'css/**', 'images/**', '!scss/**'], dest: 'dist/'},
          {expand: true, flatten: true, src: ['bower_components/jquery/jquery.min.js', 'bower_components/modernizr/modernizr.js'], dest: 'dist/js/vendor/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/foundation/js/foundation.min.js'], dest: 'dist/js/foundation/', filter: 'isFile'}
        ]
      },
    },

    useminPrepare: {
      html: '*.html',
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
      grunt: { files: ['Gruntfile.js'] },
      sass: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
  grunt.registerTask('publish', ['clean:dist', 'useminPrepare', 'copy:dist', 'usemin']);

}