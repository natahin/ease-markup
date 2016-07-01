/*eslint-disable*/
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files: [
          { expand: true, filter: 'isFile', flatten: true,
            src: ['src/bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: 'public/css/'
          },
          { expand: true, filter: 'isFile', flatten: true,
            src: ['src/bower_components/bootstrap/dist/js/bootstrap.min.js'], dest: 'public/js/'
          },
          { expand: true, filter: 'isFile', flatten: true,
            src: ['src/bower_components/jquery/dist/jquery.min.js'], dest: 'public/js/'
          }
        ]
      },
      customJs: {
        files: [
          {
            expand: true, filter: 'isFile', flatten: true,
            src: ['src/js/*.js'], dest: 'public/js/'
          }
        ]
      },
      customHtml: {
        files: [
          {
            expand: true, filter: 'isFile', flatten: true,
            src: ['src/**/*.html'], dest: 'public/'
          }
        ]
      }
    },
    
    imagemin: {
      dynamic: {
        files: [ {
          expand: true, 
          cwd: 'src/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'public/images/'
        }]
      }
    },

    less: {
      build: {
        files: {
          'public/css/stylesheet.css': 'src/css/stylesheet.less'
        }
      }
    },

    pug: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: [ {
          cwd: 'src/jade',
          src: '*.jade',
          dest: 'public',
          expand: true,
          ext: '.html'
        } ]
      }
    },

    watch: {
      css: {
        files: ['src/css/*.css', 'src/css/*.less'],
        tasks: 'less'
      },
      html: {
        files: ['src/jade/**/*.jade'],
        tasks: ['pug:compile']
      },
      htmlStatic: {
        files: ['src/**/*.html'],
        tasks: ['copy:customHtml']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['copy:customJs']
      }
    },

    shell: {
      httpServer: {
        command: 'node_modules/.bin/http-server public'
      },
      livereload: {
        command: 'node_modules/.bin/livereload public'
      }
    },

    concurrent: {
      develop: {
        tasks: ['shell:httpServer', 'shell:livereload', 'watch:css', 'watch:html', 'watch:js'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-concurrent');



  grunt.registerTask('build', [ 'copy:main', 'copy:customJs', 'imagemin', 'less:build', 'pug:compile']);

  grunt.registerTask('develop', ['build', 'concurrent:develop']);

};



    // 'http-server': {
    //   dev: {
    //     root: "public/",
    //     host: "127.0.0.1",
    //     port: function(){ return 8585; },
    //     https: false,
    //     openBrowser: true
    //   }
    // }

  // grunt.loadNpmTasks('grunt-http-server');
