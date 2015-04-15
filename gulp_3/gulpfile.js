'use strict';

var gulp         = require( 'gulp' );
var iconfont     = require( 'gulp-iconfont' );
var consolidate  = require( 'gulp-consolidate' );

var fontName = 'myfont';

gulp.task( 'iconfont', function () {

  gulp.src( [ './src/icons/*.svg' ] )
  .pipe( iconfont( {
    fontName: fontName,
    appendCodepoints: true
  } ) )
  .on( 'codepoints', function( codepoints, options ) {

      // CSS templating, e.g.
      gulp.src( './src/icons/icon.scss' )
      .pipe( consolidate( 'underscore', {
        glyphs: codepoints,
        fontName: fontName,
        fontPath: '../fonts/',
        prefix: 'icon'
      } ) )
      .pipe( gulp.dest( './build/css/' ) );

  } )
  .pipe( gulp.dest( './build/fonts/' ) );

} );
