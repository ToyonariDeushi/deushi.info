//----------------------------------------------------------------------
var yellow = '\u001b[33m';
var reset = '\u001b[0m';
if (!process.env.NODE_ENV) {
    console.log(yellow + ' -------------------------------------------------' + reset);
    console.log(yellow + ' [ALRET] \n [$npm run start] もしくは [$npm run build] [$npm run image-min] してください' + reset);
    console.log(yellow + ' -------------------------------------------------' + reset);
    return
}

const isProduction = (process.env.NODE_ENV == "production");
console.log(yellow + ' =================================================' + reset);
console.log(yellow + " " +process.env.NODE_ENV + " build "+reset );
console.log(yellow + ' =================================================' + reset);

// gulpプラグインの読み込み
const gulp = require('gulp');
// Sassをコンパイルするプラグインの読み込み
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const include = require('gulp-include');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const bowerFiles = require('main-bower-files');
const del = require('del');
const uglify = require('gulp-uglify');
const mincss = require('gulp-minify-css');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const spritesmith = require('gulp.spritesmith');
const imagemin = require('gulp-imagemin');
const pngquant = require("imagemin-pngquant");
const mozjpeg = require('imagemin-mozjpeg');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const readline = require('readline');
const watch = require("gulp-watch");
const fs = require('fs');
const gulpif = require('gulp-if');
const stripDebug = require('gulp-strip-debug');
const merge = require('merge-stream');
//----------------------------------------------------------------------

const DIST = 'dist';
const SRC = 'src';
const PORT = 3005;//browser-syncのポート番号
const PROXY_URL = "http://localhost:8007/";//PHPの動いている環境（MAMPなどで設定した)URLを入れるとプロキシしてくれる

//----------------------------------------------------------------------
//
// [develop] default
//
//----------------------------------------------------------------------

gulp.task('default', function (callback) {
     runSequence(['bower', 'sass', 'js', "webpack", 'images', 'fonts'], ['watch', 'browser-sync'],callback)
});

//----------------------------------------------------------------------
//
// [release]  ※リリース時は、dist内の、js css images fonts フォルダを削除し、srcからビルドし直します。
//
//----------------------------------------------------------------------

gulp.task('release', function (callback) {
    console.log(yellow + ' -------------------------------------------------' + reset);
    console.log(yellow + ' [Release build] ※画像圧縮をしたい場合、別途 $gulp image-min を実行してください ' + reset);
    console.log(yellow + ' -------------------------------------------------' + reset);
    return runSequence(
        'clean',
        "images:release",
        ['bower', 'sass', 'js', "webpack", 'fonts',"time_stamp"],
        ['watch', 'browser-sync'],
        callback
    );
});

//----------------------------------------------------------------------
// build time stamp
//----------------------------------------------------------------------
gulp.task("time_stamp", function () {
    //version.htmlがなければ生成、あれば上書き
    fs.writeFile(DIST +"/include/version.html", (new Date).getTime(), function (err) {
        if (err) {
            throw err;
        }
      });
})

//----------------------------------------------------------------------
// clean dist folder
//----------------------------------------------------------------------
gulp.task('clean', function (cb) {
    return del([DIST + '/assets/images/*'
        , DIST + '/assets/css/*'
        , DIST + '/assets/js/*'
        , DIST + '/assets/fonts/*'], cb);
});


//----------------------------------------------------------------------
//  image
//----------------------------------------------------------------------
gulp.task('images', ['sprite', 'image-copy']);
gulp.task('images:release', function (callback) {
    // return runSequence('sprite', 'image-copy', 'image-min', callback);
    return runSequence('sprite', 'image-copy', callback);
});

// sprite image
gulp.task('sprite', function () {
    var unixTime = Date.now();
    var spriteData = gulp.src(SRC + '/assets/images_sprite/*.png').pipe(
        spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            imgPath: `/assets/images/sprite.png?v=${unixTime}`,
            padding: 10,
            retinaSrcFilter: [SRC + '/assets/images_sprite/*-2x.png'],
            retinaImgName: 'sprite-2x.png',
            retinaImgPath: `/assets/images/sprite-2x.png?v=${unixTime}`
            , cssVarMap: function (sprite) {
                sprite.name = 'sprite-' + sprite.name;
            }
        }
    ));
    var imgStream = spriteData.img
    .pipe(gulp.dest(DIST + '/assets/images/'));
    var cssStream = spriteData.css
    .pipe(gulp.dest(SRC + '/assets/css/'));
    return merge(imgStream, cssStream);
});

//コピー
gulp.task('image-copy', function (callback) {
    return gulp.src([SRC + '/assets/images/**/*'])
        .pipe(gulp.dest(DIST + '/assets/images'))
});

//圧縮
gulp.task('image-min', function () {
    console.log(yellow + ' -------------------------------------------------' + reset);
    console.log(yellow + '[画像圧縮に数分かかります] ' + reset);
    console.log(yellow + ' -------------------------------------------------' + reset);
    var loadarray = ["-", "\\", "|", "/"];
    var cnt = 0;
    setInterval(function () {
        readline.clearLine(process.stdout);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(loadarray[cnt % loadarray.length]);
        cnt++;
    }, 1000 / 10);

    return gulp.src([DIST + '/assets/images/**/*'])
        .pipe(plumber())
        .pipe(imagemin([
            pngquant({
                quality: '65-80',
                speed: 1,
                floyd: 0
            }),
            mozjpeg({
                quality: 85,
                progressive: true
            }),
            imagemin.svgo(),
            imagemin.optipng(),
            imagemin.gifsicle(),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest(DIST + '/assets/images'))
});

//----------------------------------------------------------------------
// fonts
//----------------------------------------------------------------------
gulp.task('fonts', function () {
    return gulp.src([
        SRC + '/assets/fonts/**/*'
    ])
    .pipe(gulp.dest(DIST + '/assets/fonts/'))
});

//----------------------------------------------------------------------
// css
//----------------------------------------------------------------------
gulp.task('sass', function () {
    return gulp.src([
        SRC + '/assets/css/**/*.scss'
        , "!" + SRC + '/assets/css/_lib/*'
    ])
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(gulpif(isProduction,mincss()))//minify
        .pipe(gulp.dest(DIST + '/assets/css/'))
});

//----------------------------------------------------------------------
// bower ライブラリをまとめて、libsに書き出す
//----------------------------------------------------------------------
gulp.task("bower", function () {
    return gulp.src(bowerFiles())
        .pipe(concat('bower_components.js'))
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest(DIST + '/assets/js/lib'));
});


//----------------------------------------------------------------------
// js
//----------------------------------------------------------------------
gulp.task('js', function () {
    return gulp
        // devのjavascriptsディレクトリ以下のJSファイルを見る
        // ファイル名の先頭にアンダースコアがついたファイルは除外
        // ライブラリフォルダ除外
        .src([
            SRC + '/assets/js/**/*.js'
            , '!' + SRC + '/assets/js/_lib/*'
            , '!' + SRC + '/assets/js/_webpack/**/*.js'//webpack用はignore
            , '!' + SRC + '/assets/js/**/_*.js'
        ])
        .pipe(gulpif(isProduction,stripDebug()))//console.logを消す
        // JS内に書かれたinclude文に応じてファイルをインクルード
        .pipe(include())
        .pipe(gulpif(isProduction,uglify({
            compress: {
                drop_console: true
            }
        })))//minify
        .pipe(gulp.dest(DIST + '/assets/js/'));
});

gulp.task('webpack', function () {
    return webpackStream(webpackConfig, webpack).on('error', function (e) {
        this.emit('end');
    })
        .pipe(gulp.dest(DIST + '/assets/js/'));
});

//----------------------------------------------------------------------
// watch
//----------------------------------------------------------------------
gulp.task('watch', function (callback) {
    watch([SRC + '/assets/images/**/*'],() => { return gulp.start(['images',"bs-reload"]);});
    watch([SRC + '/assets/css/**/*.scss'], () => { return gulp.start(['sass', 'bs-reload']); });
    watch([SRC + '/assets/js/**/*.js'],() => { return gulp.start( ['js', "webpack", 'bs-reload']); });
    watch([SRC + '/assets/js/**/*.vue'], () => { return gulp.start(["webpack", 'bs-reload']); });
    watch([DIST + '/**/*.html'], () => { return gulp.start(['bs-reload']); });
});

//----------------------------------------------------------------------
// browser sync
//----------------------------------------------------------------------
gulp.task('browser-sync', function () {
    browserSync.init({
        port: PORT,
        proxy: PROXY_URL,
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});
