var gulp = require('gulp');  
var ngAnnotate = require('gulp-ng-annotate');  
var gutil = require('gulp-util');  
// var bower = require('bower');  
var uglify = require('gulp-uglify');  
var concat = require('gulp-concat');  
var minifyCss = require('gulp-minify-css');  
var rename = require('gulp-rename');  
var sh = require('shelljs');  
var stripDebug = require('gulp-strip-debug');

gulp.task('ng-minify', function() {
    return gulp.src(['./public/app.js', './public/js/*.js'])
        //注意，此处特意如此，避免顺序导致的问题
        .pipe(ngAnnotate())
        .pipe(stripDebug())  
        .pipe(uglify({outSourceMap: false}))  
        .pipe(concat('ng.min.js'))
        .pipe(gulp.dest('./public/dist/'))
});

gulp.task('vendor', function () {
   return gulp.src(['./public/lib/*.js'])
     .pipe(uglify({outSourceMap: false}))
     .pipe(concat('vendor.min.js'))
     .pipe(gulp.dest('./public/dist/'))
});

gulp.task('default', ['ng-minify', 'vendor']);