"use strict";

var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    less = require("gulp-less"),
    notify = require("gulp-notify"), // помогают обрабатывать ошибки
    plumber = require("gulp-plumber");

// запускает локальный сервер для проекта
gulp.task("server", ["less"], function() {
  browserSync.init({
    server: { baseDir: "./App/" }
  });
  gulp.watch("App/**/*.html").on("change", browserSync.reload); // для автоматического обновления проекта при редактировании
  gulp.watch("App/**/*.js").on("change", browserSync.reload);
  gulp.watch("App/less/**/*.less", ["less"]);
});

gulp.task("less", function() {
  return gulp.src("./App/less/**/*.less")
    .pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          title: "less",
          sound: false,
          message: err.message
        }
      })
    }))
    .pipe(less())
    .pipe(gulp.dest("./App/css"))
    .pipe(browserSync.stream());
});

gulp.task("default", ["server"]);
