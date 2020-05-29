const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");
// const livereload = require("gulp-livereload");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");
const browserSync = require("browser-sync").create();

function scss() {
  return gulp
    .src(["src/scss/main.scss"])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(
      cleanCSS({
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    )
    .pipe(concat("bundle.css"))
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

const js = () =>
  gulp
    .src("src/js/App.js")
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream());

function html() {
  return gulp.src("index.html").pipe(browserSync.stream());
}

function clean() {
  return del(["dist/css/style.css"]);
}

gulp.task("scss", scss);
gulp.task("html", html);

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("src/scss/*.scss", scss);
  gulp.watch("index.html", html);
  gulp.watch("src/js/*.js", js);
}

gulp.task("watch", watch);

gulp.task("build", gulp.series(clean, gulp.parallel(scss, js)));

gulp.task("default", gulp.series("build", "watch"));
