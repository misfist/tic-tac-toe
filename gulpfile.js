var gulp = require('gulp'),
	plumber = require( 'gulp-plumber' ),
	watch = require( 'gulp-watch' ),
	livereload = require( 'gulp-livereload' ),
	minifycss = require( 'gulp-minify-css' ),
	jshint = require( 'gulp-jshint' ),
	stylish = require( 'jshint-stylish' ),
	uglify = require( 'gulp-uglify' ),
	rename = require( 'gulp-rename' ),
	notify = require( 'gulp-notify' ),
	include = require( 'gulp-include' ),
	concat = require('gulp-concat'),
	sass = require( 'gulp-sass' );

var onError = function( error ) {
	console.error( error.message );
	this.emit( 'end' );
}

// Styles
gulp.task( 'scss', function() {
	return gulp.src( './src/sass/style.scss', {
		style: 'expanded'
	} )
		.pipe( plumber( { errorHandler: onError } ) )
		.pipe( sass() )
		.pipe( gulp.dest( './assets/css' ) )
		.pipe( minifycss() )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( gulp.dest( './assets/css' ) )
		.pipe( livereload() )
		.pipe( notify({ message: 'Styles task complete' }));
} );

// Scripts
gulp.task('scripts', function() {
  return gulp.src( 'src/js/**/*.js' )
    .pipe( concat( 'main.js') )
    .pipe( gulp.dest( 'assets/js' ) )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( uglify() )
    .pipe( gulp.dest('assets/js') )
    .pipe( notify( { message: 'Scripts task complete' } ) );
});


// Watch
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('src/sass/**/*.scss', ['scss']);

	// Watch .js files
	gulp.watch('src/js/**/*.js', ['scripts']);

	gulp.watch( './**/*.php' ).on( 'change', function( file ) {
		livereload.changed( file );
	} );

	// Create LiveReload server
	livereload.listen();

	// Watch any files in dist/, reload on change
	gulp.watch(['assets/**']).on('change', livereload.changed);

});

gulp.task( 'default', [ 'scss', 'scripts', 'watch' ], function() {

} );