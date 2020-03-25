const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();
const image = require('gulp-image');

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@',
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}

function toCss() {
    return src('src/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer({
            // overrideBrowserslist: ['last 2 versions'], 
            // write Browserslist in package.json
        }))
        .pipe(csso())
        .pipe(concat('style.css'))
        .pipe(dest('dist'))
}

function libs() {
    return src('src/libs/**')
    .pipe(dest('dist/libs'))
}
function img() {
    return src('src/img/**')
    .pipe(image())
    .pipe(dest('dist/img'));
}

function fonts() {
    return src('src/fonts/**')
    .pipe(dest('dist/fonts/'))
}

function js() {
    return src('src/js/**/*.js')
    .pipe(dest('dist/js/'))
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: './dist'
    });

    watch('src/**/*.html', series(html)).on('change', sync.reload);
    watch('src/sass/**/*.sass', series(toCss)).on('change', sync.reload);
    watch('src/img/**', series(img)).on('change', sync.reload);
    watch('src/fonts/**', series(fonts)).on('change', sync.reload);
    watch('src/js/**', series(js)).on('change', sync.reload);
    watch('src/libs/**', series(libs)).on('change', sync.reload);
}


exports.build = series(clear, toCss, html);
exports.serve = series(clear, toCss, html, img, fonts, js, libs, serve);
exports.clear = clear;