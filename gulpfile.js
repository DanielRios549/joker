var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('watch');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var maps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');

var tsConfig = ts.createProject('tsconfig.json', {
    //noImplicitAny: true
});

var stylesDir = 'css/';
var scriptsDir = 'javascript/';

//Files

var styles = [
    'css/sass/userSite/userStyle.scss',
    'css/sass/adminSite/adminStyle.scss'
];

var scripts = [
    //'typescript/**/*.ts',
    'typescript/jokerScript.ts',
];

//execute the task inside the array only with 'gulp' command

gulp.task('default', ['sass', 'ts']);

//Execute all minifies tasks, run this task before the commit and mainly, before the push

gulp.task('prod', ['sassmin', 'tsmin']);

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

//Compile Typescript into Javascript

gulp.task('ts', function() {
    return gulp.src(scripts)
    .pipe(maps.init())
    .pipe(tsConfig())
    .pipe(maps.write())
    .pipe(gulp.dest(scriptsDir));
});

//Watch all files including all that are imported, than complile using 'ts' task

gulp.task('tswatch', function() {
    gulp.watch('typescript/**/*.ts', ['ts']);
});

//minify only the javascript

gulp.task('tsmin', function() {
    return gulp.src(scripts)
    .pipe(tsConfig())
    .pipe(uglify())
    .pipe(gulp.dest(scriptsDir));
});

//Compile only style file with the same name, the imports will be added on file compilled
//Sass outputs: expanded, compact, compressed

gulp.task('sass', function() {
    return gulp.src(styles)
    .pipe(maps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(maps.write())
    .pipe(gulp.dest(stylesDir));
});

//Watch all files including all that are imported, than complile using 'sass' task

gulp.task('sasswatch', function() {
    gulp.watch('css/sass/**/*.scss', ['sass']);
});

//minify only the css

gulp.task('sassmin', function() {
    return gulp.src(styles)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(stylesDir));
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