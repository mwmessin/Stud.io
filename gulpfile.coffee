gulp = require 'gulp'
watch = require 'gulp-watch'
stylus = require 'gulp-stylus'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
livereload = require 'gulp-livereload'

gulp.task 'dev', ->
  gulp.src '**.coffee'
    .pipe watch()
    .pipe coffee()
    .pipe concat('script.js')
    .pipe uglify()
    .pipe livereload()

  gulp.src '**.stylus'
    .pipe watch()
    .pipe stylus()
    .pipe concat('style.css')
    .pipe livereload()
