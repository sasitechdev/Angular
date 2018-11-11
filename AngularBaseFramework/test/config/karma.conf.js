module.exports = function (config) {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],
    files: [
      'demo/js/*.module.js',
      'demo/js/*.dependency.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/js/*.module.js',
      'src/js/*.js',
      'src/js/**/*.js',
      'src/partials/**/*.html',
      'test/unit/**/*.spec.js',
      { pattern: 'demo/js/*.js.map', included: false, served: true, watched: false, nocache: true }

    ],
    port: 9876,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: false,
    plugins: [
      'karma-jasmine',
      'jasmine-core',
      'karma-phantomjs-launcher'
    ]
  });
};
