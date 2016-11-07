'use strict';

var async        = require( 'async' );
var gulp         = require( 'gulp' );
var iconfont     = require( 'gulp-iconfont' );
var consolidate  = require( 'gulp-consolidate' );

var fontName = 'myfont';

gulp.task( 'iconfont', function ( done ) {

  var iconStream = gulp.src( [ './src/icons/*.svg' ] )
    .pipe( iconfont( {
      fontName: fontName,
      prependUnicode: true
    } ) );

  async.parallel( [
    function handleGlyphs ( cb ) {
      iconStream.on( 'glyphs', function ( glyphs ) {
        gulp.src( './src/icons/icon.css' )
          .pipe( consolidate( 'underscore', {
            glyphs: glyphs,
            fontName: fontName,
            fontPath: '../fonts/',
            prefix: 'icon'
          } ) )
          .pipe( gulp.dest( './build/css/' ) )
          .on( 'finish', cb );
      });
    },
    function handleFonts ( cb ) {
      iconStream
        .pipe( gulp.dest( './build/fonts/' ) )
        .on( 'finish', cb );
    }
  ], done );

} );
