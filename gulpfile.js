var gulp = require('gulp');
var	plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

var dest = "dist/"

gulp.task('js', function() {

	var jsFiles = ['src/js/*.js'];

	return gulp.src(jsFiles)
		.pipe(plugins.concat('jnsdrop.js'))
		.pipe(gulp.dest(dest + 'js'))
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(dest + 'js'));
		
});

gulp.task('jqueryJs', function() {
		
	var jsFiles = ['src/js/*.js'];

	return gulp.src(plugins.mainBowerFiles().concat(jsFiles))
		.pipe(plugins.filter('*.js'))
		.pipe(plugins.concat('jnsdrop.js'))
		.pipe(plugins.rename({suffix: '.full'}))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(dest + 'js'));

});

gulp.task('css', function() {

	var cssFiles = ['src/scss/*.scss'];
	
	return gulp.src(cssFiles)
		.pipe(plugins.rubySass({ style: 'expanded' }))
		.pipe(plugins.autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(dest + 'css'))
		.pipe(plugins.rename({ suffix: '.min' }))
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest(dest + 'css'));
});

gulp.task('default', ['css', 'js', 'jqueryJs']);