const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

function scss() {
    return gulp.src(
        [
            'src/scss/*.scss'
        ])
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            level: {
                1: {
                    specialComments: 0
                }
            }
        }))
        .pipe(concat("bundle.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
}

const js = () => (
  gulp.src('src/js/App.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./dist/js'))
);

function html() {
    return gulp.src('index.html')
        .pipe(livereload());
}

function clean() {
    return del(['dist/css/style.css'])
}

gulp.task('scss', scss);
gulp.task('html', html);

function watch() {
    livereload.listen();
    gulp.watch('src/scss/*.scss', scss);
    gulp.watch('index.html', html);
    gulp.watch('src/js/*.js', js);
}

gulp.task('watch', watch);

gulp.task('build', gulp.series(
    clean,
    gulp.parallel(scss)
));

gulp.task('default', gulp.series('build', 'watch'));
