'use strict';
let gulp = require('gulp'),
  gulpsync = require('gulp-sync')(gulp),
  gulpNightwatch = require('gulp-nightwatch'),
  gulpClean = require("gulp-clean"),
  gulpReplace = require("gulp-replace"),
  gulpRename = require("gulp-rename");

gulp.task('test:chrome', function () {
  return gulp.src('')
    .pipe(gulpNightwatch({
      configFile: 'nightwatch.conf_chrome.js',
      cliArgs: {
        "env": "chrome",
        "tag": "google"
      }
    }))
});

gulp.task('test:firefox', function () {
  return gulp.src('')
    .pipe(gulpNightwatch({
      configFile: 'nightwatch.conf_firefox.js',
      cliArgs: {
        "env": "firefox",
        "tag": "google"
      }
    }))
});

gulp.task('test:ie', function () {
  return gulp.src('')
    .pipe(gulpNightwatch({
      configFile: 'nightwatch.conf_ie.js',
      cliArgs: {
        "env": "internet explorer",
        "tag": "google"
      }
    }))
});

gulp.task("deleteOldReports", function () {
  return gulp.src("reports", {
      read: false
    })
    .pipe(gulpClean())
});

gulp.task("generateFirefoxNightwatchConf", function () {
  return gulp.src("nightwatch.conf.js")
    .pipe(gulpReplace("{browser}", "firefox"))
    .pipe(gulpReplace("{seleniumPort}", "4587"))
    .pipe(gulpRename("nightwatch.conf_firefox.js"))
    .pipe(gulp.dest("./"))
});

gulp.task("generateIENightwatchConf", function () {
  return gulp.src("nightwatch.conf.js")
    .pipe(gulpReplace("{browser}", "ie"))
    .pipe(gulpReplace("{seleniumPort}", "3256"))
    .pipe(gulpRename("nightwatch.conf_ie.js"))
    .pipe(gulp.dest("./"))
});

gulp.task("generateChromeNightwatchConf", function () {
  return gulp.src("nightwatch.conf.js")
    .pipe(gulpReplace("{browser}", "chrome"))
    .pipe(gulpReplace("{seleniumPort}", "5689"))
    .pipe(gulpRename("nightwatch.conf_chrome.js"))
    .pipe(gulp.dest("./"))
});

gulp.task("generateNightwatchConfigs", ["generateFirefoxNightwatchConf", "generateIENightwatchConf","generateChromeNightwatchConf"])

gulp.task('default', gulpsync.sync([
  "deleteOldReports","generateNightwatchConfigs",
  ["test:chrome", "test:ie","test:firefox"]
]));
