module.exports = function( grunt ) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        files: {
          'dist/prism.css': 'sass/prism.scss'
        },
        options: {
          sourceComments: 'map',
          sourceMap: 'dist/prism.css.map'
        }
      }
    },

    copy: {
      dist: {
        files: [
          { expand: true, src: 'sass/**', dest: 'dist/' }
        ]
      },
      icons: {
        src: 'dist/assets/icons/icons.data.svg.css',
        dest: 'sass/icons/_icons.scss'
      },
      docs: {
        files: [
          { expand: true, src: 'dist/**', dest: 'docs/' },
          { exapnd: true, src: 'dist/assets/icons/preview.html', dest: 'docs/_includes/generated-icons.html' }
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

    connect: {
      server: {
        options: {
          port: 8888,
          base: 'docs'
        }
      }
    },

    grunticon: {
        myIcons: {
            files: [{
                expand: true,
                cwd: 'assets/icons',
                src: ['*.svg', '*.png'],
                dest: "dist/assets/icons"
            }],
            options: {
              previewTemplate: './assets/icons/_preview-template.hbs',
              colors: {
                graydarker: '#ff0000',
                graydark: '#ff0000',
                gray: '#ff0000',
                graylight: '#ff0000',
                graylighter: '#ff0000',
                primary: '#ff0000',
                success: '#ff0000',
                info: '#ff0000',
                danger: '#ff0000'
              }
            }
        }
    },

    watch: {
      // Watch and compile sass files, but don't reload here
      sass: {
        files: [
          'sass/**/*.scss'
        ],
        tasks: [ 'sass:dev', 'autoprefixer' ]
      },
      // Watch the compiled css files and reload here. Do this for preprocessors because the
      // file watched with options livereload is sent to the server. Dont send sass this way
      livereload: {
        files: [
          'dist/prism.css'
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-grunticon');

  // Local development with watch and js checkers
  grunt.registerTask( 'develop', [
    'build',
    'connect',
    'watch'
  ]);
  // Local development without js checkers and watch task
  grunt.registerTask( 'build', [
    'grunticon',
    'copy:icons',
    'sass:dist',
    'autoprefixer',
    'copy:dist',
    'copy:docs',
  ]);
};
