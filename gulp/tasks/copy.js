const   gulp = require('gulp'),
        fs = require('fs'),
        newer = require('gulp-newer'),        
        CONFIG = require('../config.js'),
    	 	json = JSON.parse(fs.readFileSync('./package.json')),
    	 	versionDate = new Date().toISOString().slice(0,19).replace(/[^0-9]/g, "-"),
    	 	dest = CONFIG.PATHS.destinationdir+'/Assets';

// Copies static assets
gulp.task('copy', function() {
  return gulp.src(CONFIG.ASSETS_FILES)
  	.pipe(newer(dest))
    .pipe(gulp.dest(dest));
});

//backup
gulp.task('backup', function() {
  return gulp.src('./source/**/*.*')
    .pipe(gulp.dest(CONFIG.PATHS.bckdir+versionDate+'-version'+json.version));
});