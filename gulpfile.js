const scss = require('gulp-sass')(require('sass'));
const { src, dest, watch, parallel, series } = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin')
const del = require('del');
const svgSprite =require('gulp-svg-sprite');



function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
      notify: false,
      online: true
    }
  })
}

function styles() {
  return src('app/scss/style.scss')
  .pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError))
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer({
    overrideBrowsersList: ['last 10 versions'],
    grid: true
  }))
  .pipe(dest('app/css'))
  .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    "node_modules/ion-rangeslider/js/ion.rangeSlider.js",
    "node_modules/jquery-form-styler/dist/jquery.formstyler.js",
    "node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js",
    'app/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

function images() {
  return src('app/images/**/*.*')
  .pipe(imageMin([
    imageMin.gifsicle({interlaced: true}),
	  imageMin.mozjpeg({quality: 75, progressive: true}),
	  imageMin.optipng({optimizationLevel: 5}),
	  imageMin.svgo({
		  plugins: [
			  {
				  name: 'removeViewBox',
				  active: true
			  },
			  {
				  name: 'cleanupIDs',
				  active: false
			  }
		  ]
	  })
  ]))
  .pipe(dest('dist/images'))
}

function build() {
  return src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ], {base: 'app'})
  .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function svgSprites() {
  return src('app/images/icons/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      },
    },
  }))
  .pipe(dest('app/images'))
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
  watch(['app/images/icons/*.svg'], svgSprites)
  watch(['app/**/*.html']).on('change', browserSync.reload)
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.svgSprites = svgSprites;
exports.build = series(cleanDist, images, build);

exports.default = parallel(svgSprites, styles, scripts, browsersync, watching)