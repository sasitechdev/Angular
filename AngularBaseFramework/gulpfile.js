'use strict';
var gulp = require('gulp'),
    browserify = require('browserify'),
    resolutions = require('browserify-resolutions'),
    stream = require('vinyl-source-stream'),//This just converts the bundle into the type of stream gulp is expecting
    buffer = require('vinyl-buffer'),//convert from streaming to buffered vinyl file object
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'del', 'run-sequence', 'browser-sync', 'merge-stream', 'karma*']
    });

var not = '!',
    Server = $.karma.Server,
    htmlMinOptions = {collapseWhitespace: true},
    moduleName = "testProject";

/****************** Browserify **********************/
gulp.task('browserify', function(callback){
    return $.runSequence('browserify:dependency', 'browserify:module', 'uglify:dependency', 'uglify:module', callback);
});

gulp.task('browserify:dependency', function() {
    return browserify(['./' + moduleName + '.dependency.bundle.js'])
        .plugin(resolutions, '*')
        .bundle()
        .pipe(stream(moduleName + '.dependency.js'))
        .pipe(gulp.dest('demo/js'));
});

gulp.task('browserify:module', function() {
    return browserify('./' + moduleName + '.module.bundle.js')
        .plugin(resolutions, '*')
        .bundle()
        .pipe(stream(moduleName + '.module.js'))
        .pipe(gulp.dest('demo/js'));
});

gulp.task('uglify:dependency', function(){
    return gulp.src('demo/js/' + moduleName + '.dependency.js')
        .pipe($.sourcemaps.init())
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('demo/js'));
});

gulp.task('uglify:module', function(){
    return gulp.src('demo/js/' + moduleName + '.module.js')
        .pipe($.sourcemaps.init())
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('demo/js'));
});

/****************** Styles and SCSS **********************/
gulp.task('css', function(callback){
    return $.runSequence('scss:demo', callback);
});

gulp.task('scss:demo', function(){
    return gulp.src('demo/scss/testProject.dependencies.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({includePaths:[
            './src/scss/',
            './node_modules/bootstrap-sass/assets/stylesheets/',
            './node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins/'
        ]}))
        .pipe($.cleanCss())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('demo/css'));
});

/****************** HTML **********************/
gulp.task('html', function (callback){
  return $.runSequence('copy:partials', callback);
});

gulp.task('copy:partials', function(){
  return gulp.src(['src/partials/**/*.html'])
    .pipe($.htmlmin(htmlMinOptions))
    .pipe($.flatten())
    .pipe(gulp.dest('demo/partials'));
});

/****************** Tests **********************/
function runUnitTests(done, normalMode) {
  var karamConfig = {
        configFile: __dirname + '/test/config/karma.conf.js',
        singleRun: normalMode === true
    };
    Server.start(karamConfig, function(error){
        error = error ? new Error('Karma returned with the error code: ' + error) : undefined;
        if (normalMode === true) {
          done(error);
        }
    });
}

gulp.task('test', function (done) {
    runUnitTests(done, true)
});

/****************** Webservers **********************/
gulp.task('serve:demo', function () {
    return $.browserSync.init({
        server: ['./demo', './', './src'],
        injectChanges: true,
        reloadDelay: 2000,
        browser: ["google chrome"]
    });
});

/****************** Generic Tasks **********************/
gulp.task('clean', ['del']);

gulp.task('del', function () {
    return $.del.sync(['demo/js', 'demo/css', 'demo/templates', 'demo/partials']);
});

gulp.task('default', function (callback) {
    return $.runSequence('browserify', 'css',  callback);
});

gulp.task('dev', function (callback) {
    return $.runSequence('clean', 'default', 'html', 'serve:demo', callback);
});

