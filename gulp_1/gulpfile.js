'use strict';

var gulp         = require( 'gulp' );
var iconfont     = require( 'gulp-iconfont' );

gulp.task( 'iconfont', function () {

  gulp.src( [ './src/icons/*.svg' ] )
  .pipe( iconfont( {
    fontName: 'myfont',
    appendCodepoints: true
  } ) )
  .on( 'codepoints', function( codepoints, options ) {

      // CSS templating, e.g.
      console.log( codepoints, options );

  } )
  .pipe( gulp.dest( './build/fonts/' ) );

} );
