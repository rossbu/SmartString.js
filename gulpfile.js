var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    tap = require('gulp-tap'),
    buffer = require('gulp-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    mochify = require('mochify'),
    mocha = require('gulp-mocha'),
    SRC = './lib/SmartString.js',
    TEST_SRC = './test/SmartString.test.js',
    DEST = 'dist',
    SRC_COMPILED = 'SmartString.js',
    MIN_FILE = 'SmartString.min.js';


gulp.task('browserify', function() {

    return gulp.src(SRC, { read: false }) // no need of reading file because browserify does.

    // transform file objects using gulp-tap plugin
    .pipe(tap(function(file) {

        gutil.log('bundling ' + file.path);

        // replace file contents with browserify's bundle stream
        file.contents = browserify(file.path, { debug: true }).bundle();

    }))

    // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
    .pipe(buffer())

    // load and init sourcemaps
    .pipe(sourcemaps.init({ loadMaps: true }))

    .pipe(uglify())

    // write sourcemaps
    .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest('dist'));

});

/*
// gulp-browserify is deprecated
gulp.task('browserify', function() {
    return gulp.src(SRC)
        .pipe(browserify({
            detectGlobals: true,
            standalone: 'S'
        }))
        .pipe(gulp.dest(DEST));
});
*/
gulp.task('test', function() {
    return gulp.src(TEST_SRC, { read: false })
        .pipe(mocha({ reporter: 'spec', growl: 1 }));
});


gulp.task('clean', function() {
    return gulp.src(DEST)
        .pipe(rimraf());
});

gulp.task('build', ['test', 'clean', 'browserify'], function() {
    gulp.src(DEST + '/' + SRC_COMPILED)
        .pipe(uglify())
        .pipe(rename(MIN_FILE))
        .pipe(gulp.dest(DEST));
});

gulp.task('browserTest', function(done) {
    return mochify({ wd: true })
        .on('error', function(err) {
            if (err) done(err);
            else done();
        })
        .bundle();
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'build']);