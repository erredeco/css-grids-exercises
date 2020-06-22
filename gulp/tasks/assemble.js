const   gulp = require('gulp'),          
        extname = require('gulp-extname'),
        assemble = require('assemble')(),  
        helpers = require('handlebars-helpers')(),
        plumber = require('gulp-plumber'),
        CONFIG = require('../config.js');

gulp.task('assemble', function() {
  assemble.option('layoutDelims', /{{>[ \t]*?(body)[ \t]*?}}/g);
  assemble.option('layout', 'index');
  assemble.data('assets','/Assets');
  assemble.partials('./source/Templates/includes/partials/**/*.html');
  assemble.layouts('./source/Templates/layouts/*.html');
  assemble.pages('./source/Templates/pages/**/*.html');
  assemble.data('./source/Templates/data/**/*.json');
  assemble.helpers('./source/Templates/helpers/**/*.js')

  return assemble.toStream('pages')
      .pipe(assemble.renderFile())
      .pipe(extname())
      .pipe(assemble.dest(CONFIG.PATHS.destinationdir+'/'));
});