const {src, dest, watch, parallel, series} = require('gulp');

const scss          = require('gulp-sass');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const del           = require('del');
const sourcemaps    = require('gulp-sourcemaps');
const ttf2woff      = require('gulp-ttf2woff');
const ttf2woff2     = require('gulp-ttf2woff2');
const devip         = require('dev-ip');

function browsersync(){
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false,
        host: devip()
    })
}

function fonts(){
    src('app/fonts/*.ttf')
    .pipe(ttf2woff())
    .pipe(dest('dist/fonts'));

    return src('app/fonts/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('dist/fonts'));
}

function images(){
    return src('app/img/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/img'))
}

function scripts(){
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
        'app/js/main.js'
    ])
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function styles(){
    return src(['node_modules/normalize.css/normalize.css', 'app/scss/style.scss'])
        .pipe(sourcemaps.init())
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function build(){
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html',
        'app/*.php',
        'app/works/**/*'
    ], {base: 'app'})
    .pipe(dest('dist'));
}

function cleanDist(){
    return del('dist')
}


function watching(){
    watch(['app/*.html']).on('change', browserSync.reload);
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleandist = cleanDist;

exports.build = series(cleanDist, images, fonts, styles, scripts, build);
exports.default = parallel(styles, scripts, browsersync, watching);

exports.gitApp = parallel(styles, scripts);