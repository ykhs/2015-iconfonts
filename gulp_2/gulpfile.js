'use strict';

var gulp         = require( 'gulp' );
var iconfont     = require( 'gulp-iconfont' );
var consolidate  = require( 'gulp-consolidate' );

var fontName = 'myfont';

gulp.task( 'iconfont', function () {

  gulp.src( [ './src/icons/*.svg' ] )
  .pipe( iconfont( {
    fontName: fontName,
    prependUnicode: true
  } ) )
  .on( 'glyphs', function( glyphs, options ) {

      // CSS templating, e.g.
      gulp.src('./src/icons/icon.css')
      .pipe(consolidate( 'underscore', {
        glyphs: glyphs,
        fontName: fontName,
        fontPath: '../fonts/',
        prefix: 'icon'
      } ) )
      .pipe( gulp.dest( './build/css/' ) );

  } )
  .pipe( gulp.dest( './build/fonts/' ) );

} );
