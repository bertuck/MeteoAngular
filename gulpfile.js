/**
 * @author  Jozef Butko
 * @url		  www.jozefbutko.com/resume
 * @date    March 2015
 * @license MIT
 *
 * AngularJS Boilerplate: Build, watch and other useful tasks
 *
 * The build process consists of following steps:
 * 1. clean /_build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. minify and copy all JS files
 * 7. copy fonts
 * 8. show build folder size
 *
 */
var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    $               = require('gulp-load-plugins')(),
    del             = require('del'),
    runSequence     = require('run-sequence'),
    minifyjs        = require('gulp-js-minify'),
    uglify = require('gulp-uglify');


// optimize images
gulp.task('images', function() {
  return gulp.src(['./images/**/*', './images/**/**/*'])
      .pipe($.changed('./_build/images'))
      .pipe($.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest('./_build/images'));
});

// browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// minify JS
gulp.task('minify-js', function() {
  gulp.src('js/*.js')
      .pipe($.uglify())
      .pipe(gulp.dest('./_build/'));
});

// minify CSS
gulp.task('minify-css', function() {
  gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
      .pipe($.rename({suffix: '.min'}))
      .pipe($.minifyCss({keepBreaks:true}))
      .pipe(gulp.dest('./styles/'))
      .pipe(gulp.dest('./_build/css/'));
});

// minify HTML
gulp.task('minify-html', function() {
  var opts = {
    comments: true,
    spare: true,
    conditionals: true
  };

  gulp.src('./*.html')
      .pipe($.minifyHtml(opts))
      .pipe(gulp.dest('./_build/'));
});

// copy fonts from a module outside of our project (like Bower)
gulp.task('fonts', function() {
  gulp.src('./fonts/**/*.{ttf,woff,eof,eot,svg}')
      .pipe($.changed('./_build/fonts'))
      .pipe(gulp.dest('./_build/fonts'));
});

// start webserver
gulp.task('server', function(done) {
  return browserSync({
    server: {
      baseDir: './'
    }
  }, done);
});

// start webserver from _build folder to check how it will look in production
gulp.task('server-build', function(done) {
  return browserSync({
    server: {
      baseDir: './_build/'
    }
  }, done);
});

// delete build folder
gulp.task('clean:build', function (cb) {
  del([
    './_build/'
    // if we don't want to clean any file we can use negate pattern
    //'!dist/mobile/deploy.json'
  ], cb);
});

// concat files
gulp.task('minify', function() {
    gulp.src([
            './_build/js/config.js',
            './_build/js/city.locator.js',
            './_build/js/geolocation.js',
            './_build/js/main.nav.js',
            './_build/js/map.js',
            './_build/js/meteo.js',
            './_build/js/meteo.widget.js',
            './_build/js/more.js',
            './_build/js/query.js',
            './_build/js/responsive.nav.js',
            './_build/js/twitter.js',
            './_build/js/app.js'
        ]
    )
        .pipe(gulp.dest('./_build/js/'))
        .pipe($.concat('scripts.min.js'))
        .pipe(minifyjs())
        .pipe(gulp.dest('./_build/js/'));
});

gulp.task('unify', function() {
    gulp.src([
            './app/config/config.js',
            './app/components/city.locator.js',
            './app/components/geolocation.js',
            './app/components/main.nav.js',
            './app/components/map.js',
            './app/components/meteo.js',
            './app/components/meteo.widget.js',
            './app/components/more.js',
            './app/components/query.js',
            './app/components/responsive.nav.js',
            './app/components/twitter.js',
            './app/app.js'
        ]
    )
        .pipe($.concat('scripts.js'))
        .pipe(gulp.dest('./_build/js/'))
});

// concat files
gulp.task('uglify', function() {
    gulp.src([
            './app/config/config.js',
            './app/components/city.locator.js',
            './app/components/geolocation.js',
            './app/components/main.nav.js',
            './app/components/map.js',
            './app/components/meteo.js',
            './app/components/meteo.widget.js',
            './app/components/more.js',
            './app/components/query.js',
            './app/components/responsive.nav.js',
            './app/components/twitter.js',
            './app/app.js'
        ]
    )
        .pipe(uglify())
        .pipe(gulp.dest('./_build/js/'));
});


// SASS task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function() {
  return gulp.src('styles/style.scss')
      .pipe($.sourcemaps.init())
      .pipe($.sass({
        style: 'expanded'
      }))
      .on('error', $.notify.onError({
        title: 'SASS Failed',
        message: 'Error(s) occurred during compile!'
      }))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('styles'))
      .pipe(reload({
        stream: true
      }))
      .pipe($.notify({
        message: 'Styles task complete'
      }));
});

// SASS Build task
gulp.task('sass:build', function() {
  var s = $.size();

  return gulp.src('styles/style.scss')
      .pipe($.sass({
        style: 'compact'
      }))
      .pipe($.autoprefixer('last 3 version'))
      .pipe($.uncss({
        html: ['./index.html', './app/html/**/*.html'],
        ignore: [
          '.index',
          '.slick',
          /\.owl+/,
          /\.owl-next/,
          /\.owl-prev/
        ]
      }))
      .pipe($.minifyCss({
        keepBreaks: true,
        aggressiveMerging: false,
        advanced: false
      }))
      .pipe($.rename({suffix: '.min'}))
      .pipe(gulp.dest('_build/css'))
      .pipe(s)
      .pipe($.notify({
        onLast: true,
        message: function() {
          return 'Total CSS size ' + s.prettySize;
        }
      }));
});

// BUGFIX: warning: possible EventEmitter memory leak detected. 11 listeners added.
require('events').EventEmitter.prototype._maxListeners = 100;

// index.html build
// script/css concatenation
gulp.task('usemin', function() {
  return gulp.src('./index.html')
    // add templates path
      .pipe($.htmlReplace({
        'templates': '<script type="text/javascript" src="js/templates.js"></script>'
      }))
      .pipe(gulp.dest('./_build/'));
});

// make templateCache from all HTML files
gulp.task('templates', function() {
  return gulp.src([
    './app/html/**/*.html',
    '!bower_components/**/*.*',
    '!node_modules/**/*.*',
    '!_build/**/*.*'
  ])
      .pipe($.minifyHtml())
      .pipe($.angularTemplatecache({
        module: 'boilerplate'
      }))
      .pipe(gulp.dest('_build/js/'));
});

// reload all Browsers
gulp.task('bs-reload', function() {
  browserSync.reload();
});

// calculate build folder size
gulp.task('build:size', function() {
  var s = $.size();

  return gulp.src('./_build/**/*.*')
      .pipe(s)
      .pipe($.notify({
        onLast: true,
        message: function() {
          return 'Total build size ' + s.prettySize;
        }
      }));
});


// default task to be run with `gulp` command
// this default task will run BrowserSync & then use Gulp to watch files.
// when a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task('default', ['browser-sync', 'sass', 'minify-css', 'uglify', 'minify', 'unify'], function() {
  gulp.watch('styles/*.css', function(file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });
  gulp.watch(['*.html', 'components/**/*.html', 'views/*.html'], ['bs-reload']);
  gulp.watch(['app/*.js', 'components/**/*.js', 'js/*.js'], ['bs-reload']);
  gulp.watch('styles/**/*.scss', ['sass', 'minify-css']);
});


/**
 * build task:
 * 1. clean /_build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. minify and copy all JS files
 * 7. copy fonts
 * 8. show build folder size
 *
 */

gulp.task('build', [
    'sass:build',
    'uglify',
    'minify',
    'images',
    'templates',
    'usemin'
], function() {
    gulp.watch(['index.html', 'blocks/*.html', 'pages/*.html'], ['bs-reload']);
    gulp.watch(['_build/js/script.min.js'], ['bs-reload']);
    gulp.watch('_build/css/*.css');
});
