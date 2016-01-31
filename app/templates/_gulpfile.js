/**
 * Created by manpreetsinghbedi on 31/01/16.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var mocha = require('gulp-mocha');
var wiredep = require('wiredep').stream;

gulp.task('serve', ['sass', 'compress', 'inject'], function(){
    browserSync.init({
        server:{
            baseDir: "./"
        }
    });
    gulp.watch('src/**/*', ['sass', 'compress', 'inject']);
    gulp.watch("src/*.html").on('change', browserSync.reload);

    //var watchFiles = [
    //	'bower_components/*/dist/js/*.js',
    //	'!bower_components/*/dist/js/*.min.js',
    //	'bower_components/*/dist/*.js',
    //	'bower_components/*/dist/css/*.css',
    //	'!bower_components/*/dist/css/*.min.css',
    //	'bower_components/*/dist/font/*'
    //];
    //gulp.watch(watchFiles, ['inject']);
    //return gulp.src('test/test.js', {read: false})
    //    // gulp-mocha needs filepaths so you can't have any plugins before it
    //    .pipe(mocha({reporter: 'nyan'}))
    //    .once('error', function () {
    //        process.exit(1);
    //    })
    //    .once('end', function () {
    //
    //    });


});

gulp.task('inject', function () {
    var target = gulp.src('./src/templates/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./build/**/*.js', './build/**/*.css'], {read: false});
    return target.pipe(inject(sources))
        .pipe(wiredep({directory: 'bower_components', 'ignorePath' : '../../'}))
        .pipe(gulp.dest('./'));

});

gulp.task('sass', function () {
    gulp.src('src/styles/scss/*scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());

});

gulp.task('compress', function(){
    gulp.src(['src/javascript/**/*.js'])
        .pipe(minify({
            exclude : [''],
            ignoreFiles : []
        }))
        .pipe(gulp.dest('./build/js'))
        .on('error', gutil.log)
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);