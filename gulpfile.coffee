gulp = require 'gulp'
watch = require 'gulp-watch'
coffee = require 'gulp-coffee'
stylus = require 'gulp-stylus'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
livereload = require 'gulp-livereload'

gulp.task 'dev', ->
  gulp.src '*.coffee'
    .pipe watch()
    .pipe coffee()
    .pipe livereload()
