// Generated on 2014-02-24 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // We should be able to customize the template soon. https://github.com/jacobrask/styledocco/issues/51
    styledocco: {
      dist: {
        options: {
          name: '"Style Guide"',
          preprocessor: '"sass --compass"',
          include: [
            '.tmp/styles/style.css',
            'app/fonts/icons.*'
          ]
        },
        files: {
          'styleguide': 'app/styles'
        }
      }
    },

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/**/*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729,
        middleware: function (connect, options, mw) {
          mw.push(require('connect-modrewrite')([
            '!\\.html|\\.js|\\.css|\\.jpg|\\.png|\\.svg|\\.ttf|\\.eot|\\.woff$ /index.html [L]'
          ]));
          options.base.forEach(function (base) {
            // Serve static files.
            mw.push(connect.static(base));
          });

          return mw;
        }
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/**/*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              '<%= yeoman.dist %>/*',
              '!<%= yeoman.dist %>/.git*'
            ]
          }
        ]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',
            src: '**/*.css',
            dest: '.tmp/styles/'
          }
        ]
      }
    },

    // Automatically inject Bower components into the app
    bowerInstall: {
      app: {
        // Point to the files that should be updated when
        // you run `grunt bowerInstall`
        src: [
          'app/index.html',
          'app/views/**/*.html',   // .html support...
          'app/views/**/*.jade',   // .jade support...
          'app/styles/style.scss',  // .scss & .sass support...
          'app/config.yml'         // and .yml & .yaml support out of the box!
        ],
        exclude: [
          'es5-shim.js',
          'json3.min.js',
          'html5shiv.js',
          'html5shiv-printshiv.js'
        ],
        fileTypes: {
          scss: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              scss: /'.*\.scss'/gi
            },
            replace: {
              // relative path to bower_components
              scss: '@import \"{{filePath}}\";'
            }
          },
          html: {
            replace: {
              js: '<script src=\"/{{filePath}}\"></script>'
            }
          }
        },
        ignorePath: '<%= yeoman.app %>/'
      },
      test: {
        src: 'karma.conf.js',
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /'.*\.js'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: false
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/**/*.js',
            '<%= yeoman.dist %>/styles/**/*.css',
            '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%= yeoman.app %>/*.html', '<%= yeoman.app %>/views/**/*.html'],
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/styles/**/*.css'],
      js: ['<%= yeoman.dist %>/scripts/**/*.js'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/styles/**/*'],
        patterns: {
          js: [
            [/css:"assets\/styles\/?[A-Za-z]*\/+([A-Za-z0-9]+\.css)"}/g, 'revved css resolves']
          ]
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            src: '**/*.{png,jpg,jpeg,gif}',
            dest: '<%= yeoman.dist %>/images'
          }
        ]
      }
    },
    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            src: '{,*/}*.svg',
            dest: '<%= yeoman.dist %>/images'
          }
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.dist %>/assets',
            src: ['views/**/*.html', 'scripts/modules/**/*.html'],
            dest: '<%= yeoman.dist %>/assets'
          },
          {
            expand: true,
            cwd: '<%= yeoman.dist %>',
            src: 'index.html',
            dest: '<%= yeoman.dist %>'
          }
        ]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/concat/scripts',
            src: '*.js',
            dest: '.tmp/concat/scripts',
            exclude: 'vendor.js'
          }
        ]
      }
    },

    cssmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/',
            src: 'styles/**/*.css',
            dest: '<%= yeoman.dist %>/assets'
          }
        ]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      // Production
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '*.html'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>/assets',
            dest: '<%= yeoman.dist %>/assets',
            src: [
              'views/**/*.html',
              'images/{,*/}*.{webp}',
              'fonts/*',
              'scripts/**/*.html'
            ]
          },

          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/images',
            src: ['generated/*']
          }
        ]
      },
      uncompressed: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '*.html',
              'views/**/*.html',
              'images/{,*/}*.{webp}',
              'fonts/*',
              'scripts/**/*'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>/assets',
            src: [
              'bower_components/**/*'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/images',
            src: ['generated/*']
          },
          {
            expand: true,
            cwd: '.tmp/styles',
            dest: '<%= yeoman.dist %>/styles',
            src: ['**/*.css']
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/styles',
            dest: '<%= yeoman.dist %>/styles',
            src: [
              'printHijack/*.css'
            ]
          }
        ]
      },
      docs: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'docs',
            dest: 'docs/generated',
            src: [
              '**/*',
              'src/*'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>/scripts',
            dest: 'docs/generated/src',
            src: [
              'directives/**/*.js',
              'filters/**/*.js',
              'services/**/*.js'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>/views',
            dest: 'docs/generated/src/views',
            src: [
              'partials/*.html'
            ]
          }
        ]
      },
      styleguide: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>',
            dest: 'styleguide',
            src: [
              'fonts/*.{eot,svg,ttf,woff}'
            ]
          }
        ]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass',
        'jshint:all',
        'imagemin'
      ],
      dist: [
        'compass:dist'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    'string-replace': {
      prod: {
        files: {
          '<%= yeoman.dist %>/index.html': '<%= yeoman.dist %>/index.html'
        },
        options: {
          replacements: [
            {
              pattern: /<script src=".*\.dev\.js"><\/script>/g,
              replacement: ''
            }
          ]
        }
      },
      'test': {
        files: {
          'dist/index.html': 'dist/index.html'
        },
        options: {
          replacements: [
            {
              pattern: /<script src=".*\.dev\.js"><\/script>/g,
              replacement: ''
            },
            {
              pattern: /<script src=".*\/mocks\/.*\.js"><\/script>/g,
              replacement: ''
            },
            {
              pattern: /<script src=".*Dev\.js"><\/script>/g,
              replacement: ''
            }
          ]
        }
      }
    },
    // To use this, see https://npmjs.org/package/grunt-sftp-deploy about the .ftppass file
    'sftp-deploy': {
      build: {
        auth: {
          host: '',
          port: 22,
          authKey: 'key1'
        },
        src: 'dist',
        dest: '',
        exclusions: ['dist/**/.DS_Store', 'dist/**/Thumbs.db', 'dist/tmp']
      },
      docs: {
        auth: {
          host: '',
          port: 22,
          authKey: 'key2'
        },
        src: 'docs/generated',
        dest: '',
        exclusions: []
      }
    },
    uglify: {
      options: {
        compress: {
          global_defs: {
            "DEBUG": false
          },
          dead_code: true,
          drop_console: true
        }
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build:ie', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bowerInstall',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', function (target) {
    var tasks = [];

    switch (target) {

      case 'test':
        tasks = [
          'clean:dist',
          'newer:jshint',
          'concurrent:test',
          'autoprefixer',
          'copy:uncompressed',
          'string-replace:test'
        ];
        break;

      //case 'prod':
      default:
        tasks = [
          //'bowerInstall',
          'clean:dist',
          'useminPrepare',
          'compass:dist',
          'autoprefixer',
          'concat',
          'ngAnnotate',
          'imagemin',
          'svgmin',
          'copy:dist',
          'cdnify',
          'cssmin',
          'uglify',
          'rev',
          'usemin',
          'string-replace:prod',
          'htmlmin'
        ];
        break;
    }
    grunt.task.run(tasks);
  });

  grunt.registerTask('dgeni', 'Generate docs via dgeni.', function (target) {
    var dgeni = require('dgeni');
    var done = this.async();
    var tasks = [];

    dgeni('docs/config.js')
      .generateDocs()
      .then(done);

    tasks.push('copy:docs');

    if (target === 'deploy') {
      tasks.push('sftp-deploy:docs');
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('styleguide', ['concurrent:test', 'styledocco', 'copy:styleguide']);

  grunt.registerTask('default', [
    'build'
  ]);
};
