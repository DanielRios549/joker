//Gulp tasks for sass

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('watch');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

//Files

var styles = [
    'css/sass/userSite/userStyle.scss',
    'css/sass/adminSite/adminStyle.scss'
];

var scripts = [
    'javascript/userScript.js',
    'javascript/adminScript.js',
    'javascript/userAjax.js',
    'player/file.js',
    'player/joker/jokerPlayer.js',
    'player/joker/mouseStop.js'
];

var userStyle = styles[0];
var adminStyle = styles[1];

var userScript = scripts[0];
var adminScript = scripts[1];
var userAjax = scripts[2];
var PlayerFile = scripts[3];
var jokerPlayer = scripts[4];
var mouseStop = scripts[5];

//Execute all minifies tasks, run this task before the commit and mainly, before the push

gulp.task('prod', ['minicss', 'minijs', 'minihtml']);

//minify only the html

gulp.task('minihtml', function() {
    return gulp.src(['layout/*.html', 'layout/admin/*.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('test/'));
});

//minify only the css

gulp.task('minicss', function() {
    return gulp.src(styles)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('css/'));
});

//minify only the javascript

gulp.task('minijs', function() {
    //return gulp.src(scripts)
    //.pipe(rename(scripts))
    //.pipe(gulp.dest('backup/'));

    return gulp.src(['javascript/*.js', 'player/file.js', 'player/joker/*.js'])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(function(file) {
        return file.base;
    }));
});

//Task to copy only components the project needs

gulp.task('bower', function() {
    gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe(rename('jquery.js'))
    .pipe(gulp.dest('./javascript/libraries/'));

    gulp.src('bower_components/font-awesome/fonts/FontAwesome.otf')
    .pipe(rename('fontAwesome.otf'))
    .pipe(gulp.dest('./fonts/icons/'));

    gulp.src('bower_components/font-awesome/scss/_variables.scss')
    .pipe(rename('_fontIcon.txt'))
    .pipe(gulp.dest(''));
});

//Compile only style file with the same name, the imports will be added on file compilled
//Sass outputs: expanded, compact, compressed

gulp.task('sass', function() {
    return gulp.src([userStyle, adminStyle])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('css/'));
});

//Watch all files including all that are imported, than complile using 'sass' task

gulp.task('watch', function() {
    gulp.watch('css/sass/**/*.scss', ['sass']);
});

//Use to sync the web browser

gulp.task('sync', function() {
    browserSync({
        proxy: '127.0.0.1/joker',
        port: 6767,
        open: true,
        notify: false
    });
});

//execute the task inside the array only with 'gulp' command

gulp.task('default', ['sass', 'watch']);
