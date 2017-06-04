var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require("gulp-autoprefixer"),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    _Proxy = require('http-proxy-middleware'),
    notify = require('gulp-notify');

gulp.task('styles',function(){//创建一个任务
    gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    // .pipe(concat('main.css'))合并
    .pipe(gulp.dest('./css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./css'))
    .pipe(notify('css  style task complete'))
})

gulp.task("server", function () {
    connect.server({
        root: "./",
        port: 8000,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                _Proxy('/api',  {
                    target: 'http://www.financedatas.com/',
                    changeOrigin:true
                })
            ]
        }
    });
});

gulp.task('default',function(){//开启一个默认任务
    gulp.start('styles');
})

gulp.task('watch',function(){
    gulp.watch('./scss/*.scss',['styles']); //监听一个目录文件，使用任务。
})