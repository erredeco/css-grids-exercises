'use strict';

const   gulp = require('gulp'),
        sass = require('gulp-sass'),
        plumber = require('gulp-plumber'),
        sourcemaps = require('gulp-sourcemaps'),
        gulppostcss = require('gulp-postcss'),
        autoprefixer = require('autoprefixer'),
        updateRule = require('postcss-sprites/lib/core').updateRule,   
        assets  = require('postcss-assets'),
        sprites  = require('postcss-sprites'),
        postcss = require('postcss'),
        concat = require('gulp-concat'),
        sortMediaQuery = require('postcss-sort-media-queries'),
        streamqueue =   require('streamqueue'),
        CONFIG = require('../config.js');


// Declare some variables I will use here
var assetsopts = {    
    cachebuster: true,
    loadPaths: ['Fonts/', 'Images/', 'Sprites/'],
    relative: true,          
    basePath: CONFIG.PATHS.destinationdir+'Assets/',   
};


var sassopts = {
    includePaths: CONFIG.SASS_PATHS,
    outputStyle: 'expanded',
    sourceComments:true,
    sourceMap: true
};

var sortmediaqueryopts = {
    sort: 'mobile-first'
};

var spritesopts = {
    spritePath: CONFIG.PATHS.destinationdir+'Assets/Sprites/',
    stylesheetPath: CONFIG.PATHS.destinationdir+'Assets/Css/',
    retina: true,
    verbose:false,
    hooks: {
        onUpdateRule: function(rule, token, image) {
            // Use built-in logic for background-image & background-position
            updateRule(rule, token, image);
  
            ['width', 'height'].forEach(function(prop) {
                var value = image.coords[prop];
                if (image.retina) {
                    value /= image.ratio;
                }
                rule.insertAfter(rule.last, postcss.decl({
                    prop: prop,
                    value: value + 'px'
                }));
            });
        }
    },
    
    // use only images inside Sprites
    filterBy: function(image) {
            
        if (!/Sprites\//.test(image.url)) {
            return Promise.reject();
        }
        return Promise.resolve('Sprites');
    }                  
};

var plugins = [        
    autoprefixer(), // uses ".browserslistrc" 
    assets(assetsopts),
    sprites(spritesopts),
    sortMediaQuery(sortmediaqueryopts)    
]; 


// Compiles  Sass and merge

gulp.task('sass', function() {      

 
  
  return gulp.src(CONFIG.PATHS.sourcedir+'Scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())    
    .pipe(sass(sassopts).on('error', sass.logError))   
    .pipe(gulp.dest(CONFIG.PATHS.destinationdir+'Assets/Css'))
    .pipe(gulppostcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(CONFIG.PATHS.destinationdir+'Assets/Css'))
    ;
});










/* I keep here the old one for reference
// Compiles  Sass
gulp.task('sass', function() {      

 
  
  return gulp.src(CONFIG.PATHS.sourcedir+'Scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())    
    .pipe(sass(sassopts).on('error', sass.logError))   
    .pipe(gulp.dest(CONFIG.PATHS.destinationdir+'Assets/Css'))
    .pipe(gulppostcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(CONFIG.PATHS.destinationdir+'Assets/Css'))
    ;
});

*/