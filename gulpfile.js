//Gulp tasks for sass

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('watch');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

//Run this task before the commit and mainly, before the push

gulp.task('prod', function() {
    return gulp.src(['css/sass/userSite/userStyle.scss', 'css/sass/adminSite/adminStyle.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('css/'));
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
    return gulp.src(['css/sass/userSite/userStyle.scss', 'css/sass/adminSite/adminStyle.scss'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('css/'));
});

//Watch all files including all that are imported, than complile using 'sass' task

gulp.task('watch', function() {
    gulp.watch('./css/sass/**/*.scss', ['sass']);
});

gulp.task('sync', function() {
    browserSync({
        proxy: '127.0.0.1',
        port: 6767,
        open: true,
        notify: false
    });
});

//execute the task inside the array only with 'gulp' command

gulp.task('default', ['sass', 'watch']);