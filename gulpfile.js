var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var maps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');

var tsConfigUser = ts.createProject('./typescript/userSite/tsconfig.json');
var tsConfigAdmin = ts.createProject('./typescript/adminSite/tsconfig.json');
var tsConfigPlayer = ts.createProject('./typescript/player/tsconfig.json');

var stylesDir = './css/';
var scriptsDir = './javascript/';
var playerDir = './player/joker/';
var fontsDir = './fonts/';

//Files

var styles = [
    './sass/userSite/userStyle.scss',
    './sass/adminSite/adminStyle.scss'
];

var scripts = [
    './typescript/userSite/**/*.ts',
    './typescript/adminSite/**/*.ts',
    './typescript/player/**/*.ts'
];

//Task to copy only components the project needs

gulp.task('dep', function() {
    // Jquery

    gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(rename('jquery.js'))
    .pipe(gulp.dest(scriptsDir + 'libraries/'));

    //WebTorrent

    gulp.src('./node_modules/webtorrent/webtorrent.min.js')
    .pipe(rename('webtorrent.js'))
    .pipe(gulp.dest(playerDir + 'libraries/'));

    //DashJS

    gulp.src('./node_modules/dashjs/dist/dash.all.min.js')
    .pipe(rename('dashScript.js'))
    .pipe(gulp.dest(playerDir + 'libraries/'));

    //Font Awesome

    gulp.src('./node_modules/font-awesome/fonts/FontAwesome.otf')
    .pipe(rename('fontAwesome.otf'))
    .pipe(gulp.dest(fontsDir + 'icons/'));

    //Icons Variables

    gulp.src('./node_modules/font-awesome/scss/_variables.scss')
    .pipe(rename('_fontIcon.txt'))
    .pipe(gulp.dest('./'));
});

//Compile Typescript into Javascript

gulp.task('ts', function() {
    gulp.src(scripts[0])
    .pipe(maps.init())
    .pipe(tsConfigUser())
    .pipe(maps.write())
    .pipe(gulp.dest(scriptsDir));

    gulp.src(scripts[1])
    .pipe(maps.init())
    .pipe(tsConfigAdmin())
    .pipe(maps.write())
    .pipe(gulp.dest(scriptsDir));

    gulp.src(scripts[2])
    .pipe(maps.init())
    .pipe(tsConfigPlayer())
    .pipe(maps.write())
    .pipe(gulp.dest(playerDir));
});

//Watch all files including all that are imported, than complile using 'ts' task

gulp.task('tswatch', function() {
    gulp.watch('typescript/**/*.ts', gulp.parallel('ts'));
});

//minify only the javascript

gulp.task('tsmin', function() {
    var userScript =  gulp.src(scripts[0])
    .pipe(tsConfigUser())
    .pipe(uglify())
    .pipe(gulp.dest(scriptsDir));

    var adminScript =  gulp.src(scripts[1])
    .pipe(tsConfigAdmin())
    .pipe(uglify())
    .pipe(gulp.dest(scriptsDir));

    var playerScript =  gulp.src(scripts[2])
    .pipe(tsConfigPlayer())
    .pipe(uglify())
    .pipe(gulp.dest(playerDir));
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
    gulp.watch('sass/**/*.scss', gulp.parallel('sass'));
});

//minify only the css

gulp.task('sassmin', function() {
    return gulp.src(styles)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(stylesDir));
});

//Execute all minifies tasks, run this task before the commit and mainly, before the push

gulp.task('prod', gulp.series('sassmin', 'tsmin'));