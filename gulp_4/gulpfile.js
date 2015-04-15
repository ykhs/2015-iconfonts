'use strict';

var gulp         = require( 'gulp' );
var iconfont     = require( 'gulp-iconfont' );
var consolidate  = require( 'gulp-consolidate' );
var sass         = require( 'gulp-sass' );
var runSequence  = require( 'run-sequence' );

var fontName = 'myfont';

gulp.task( 'iconfont', function () {

  return gulp.src( [ './src/icons/*.svg' ] )
  .pipe( iconfont( {
    fontName: fontName,
    appendCodepoints: true
  } ) )
  .on( 'codepoints', function( codepoints, options ) {

    // CSS templating, e.g.
    gulp.src( './src/icons/_icon.scss' )
    .pipe( consolidate( 'underscore', {
      glyphs: codepoints,
      fontName: fontName,
      fontPath: '../fonts/',
      prefix: 'icon'
    } ) )
    .pipe( gulp.dest( './src/scss/' ) );

  } )
  .pipe( gulp.dest( './build/fonts/' ) );

} );

gulp.task( 'sass', function () {

  return gulp.src( './src/scss/*.scss' )
  .pipe( sass( { bundleExec: true } ) )
  .pipe( gulp.dest( './build/css/' ) );

} );

gulp.task( 'build', function () {

  runSequence( 'iconfont', 'sass' );

} );
