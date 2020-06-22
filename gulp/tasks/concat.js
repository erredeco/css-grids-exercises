'use strict';

const   gulp = require('gulp'),
        concat = require('gulp-concat'),
        newer = require('gulp-newer'),
        CONFIG = require('../config.js'); 

gulp.task('app-js', function() {
  return gulp.src(CONFIG.JS_FILES,{allowEmpty: true })
  	.pipe(newer(CONFIG.PATHS.destinationdir+'Assets/Js/app.js'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(CONFIG.PATHS.destinationdir+'Assets/Js/'));
});


gulp.task('concat', gulp.parallel('app-js'));