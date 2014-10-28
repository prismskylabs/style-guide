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
                graydarker: '#333',
                graydark: '#666',
                gray: '#999',
                graylight: '#ccc',
                graylighter: '#f2f2f2',
                primary: '#00c5e5',
                success: '#56d980',
                info: '#3eccc4',
                danger: '#fc8b8b'
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
