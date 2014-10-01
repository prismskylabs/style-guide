module.exports = function( grunt ) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dev: {
        files: {
          'dist/prism.css': 'sass/prism.scss',
          'docs/styles/docs.css': 'docs/styles/docs.scss'
        },
        options: {
          includePaths: [ 'bower_components/' ],
          sourceComments: 'map',
          sourceMap: 'dist/prism.css.map'
        }
      }
    },

    copy: {
      dist: {
        files: [
          { expand: true, src: 'sass/**', dest: 'dist/' },
          { expand: true, src: 'assets/**', dest: 'dist/' }
        ]
      }
    },

    autoprefixer: {
      options: {
        browsers: [ 'last 2 version', 'ie 9' ]
      },
      dev: {
        src: 'dist/prism.css',
        dest: 'dist/prism.css'
      }
    },

    jade: {
      compile: {
        options: {
          data: {
            debug: true
          }
        },
        files: {
          'docs/index.html': [ 'docs/index.jade' ]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8888,
          base: 'docs'
        }
      }
    },

    watch: {
      // Watch and compile sass files, but don't reload here
      sass: {
        files: [
          'sass/**/*.scss',
          'docs/styles/**/*.scss'
        ],
        tasks: [ 'sass:dev', 'autoprefixer' ]
      },
      jade: {
        files: [ 'docs/**/*.jade' ],
        tasks: [ 'jade' ],
        options: { livereload: true }
      },
      // Watch the compiled css files and reload here. Do this for preprocessors because the
      // file watched with options livereload is sent to the server. Dont send sass this way
      livereload: {
        files: [
          'dist/prism.css',
          'docs/styles/docs.css'
        ],
        options: { livereload: true }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Local development with watch and js checkers
  grunt.registerTask( 'develop', [
    'build',
    'connect',
    'watch'
  ]);
  // Local development without js checkers and watch task
  grunt.registerTask( 'build', [
    'sass:dev',
    'autoprefixer',
    'copy:dist'
  ]);
};
