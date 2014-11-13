// Karma configuration
module.exports = function(config) {
    "use strict";
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        frameworks: ["jasmine"],

        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'app/bower_components/jquery/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/json3/lib/json3.min.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-cookies/angular-cookies.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            // endbower
            'app/**/*.html',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/assets/scripts/resolves.js',
            'app/assets/scripts/modules/constants/constants.js',
            'app/assets/scripts/app.js',
            'app/assets/scripts/helpers.js',
            'app/assets/scripts/**/*.js',
            'test/spec/**/*.js'
        ],

        // web server port
        port: 8080,

        // cli runner port
        runnerPort: 9100,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 5000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        // coverage reporter generates the coverage
        //noinspection CommaExpressionJS
        reporters: ['progress', 'coverage'],

        preprocessors: {
          // Views
            'app/**/*.html': ['ng-html2js'],
          // source files, that you wanna generate coverage for
          // do not include tests or libraries
          // (these files will be instrumented by Istanbul)
            'app/assets/scripts/controllers/**/*.js': 'coverage',
            'app/assets/scripts/directives/**/*.js': 'coverage',
            'app/assets/scripts/filters/**/*.js': 'coverage',
            'app/assets/scripts/services/**/*.js': 'coverage',
            'app/assets/scripts/helpers.js': 'coverage',
	        'app/assets/scripts/modules/*.js': 'coverage'
        },

        // optionally, configure the reporter
        coverageReporter : {
          type : 'html',
          dir : 'coverage/'
        },

      ngHtml2JsPreprocessor: {
        // strip this from the file path
        stripPrefix: 'app',
        // prepend this to the
//        prependPrefix: 'served/',

        // or define a custom transform function
//        cacheIdFromPath: function(filepath) {
//          return cacheId;
//        },

        // setting this option will create only a single module that contains templates
        // from all the files, so you can load them all with module('foo')
        moduleName: 'app.templates'
      }
    });
};
