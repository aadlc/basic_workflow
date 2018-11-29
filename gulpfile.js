var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    prefixer = require('gulp-autoprefixer');

var env,
    sassSrc = './components/sass/styles.scss',
    outputDir = './builds/development/',
    cssOutputStyle ='';


env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    outputDir = './builds/development/';
    cssOutputStyle = 'expanded';
} else {
    outputDir = './builds/production/';
    cssOutputStyle = 'compressed';
}


// Static Server + watching scss/html files
gulp.task('serve', function () {
    browserSync.init({
        server: "./"
    });
    gulp.watch('components/sass/*.scss', ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
    gulp.src(sassSrc)
        .pipe(sass({
            errorLogToConsole: true,
            sourceComments: true,
            sourcemap: true,
            outputStyle: cssOutputStyle
        }))
        .on('error', console.error.bind(console))
        .pipe(rename({ suffix: '.min' }))
        .pipe(prefixer('last 2 versions'))
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(browserSync.stream());
})


gulp.task('default', ['sass','serve']);