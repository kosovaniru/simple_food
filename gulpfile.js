const scss = require('gulp-sass')(require('sass'));
const { src, dest, watch, parallel, series } = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin')
const del = require('del');
const svgSprite =require('gulp-svg-sprite');
const nunjucksRender =require('gulp-nunjucks-render');
const rename = require('gulp-rename');



function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
      notify: false,
      online: true
    }
  })
}

function nunjucks() {
  return src('app/*.njk')
  .pipe(nunjucksRender())
  .pipe(dest('app'))
  .pipe(browserSync.stream())
}

function styles() {
  return src('app/scss/*.scss')
  .pipe(scss({outputStyle: 'expanded'}).on('error', scss.logError))
  .pipe(rename({
    suffix: '.min'
  }))
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
    "node_modules/@fancyapps/ui/dist/fancybox.umd.js",
    "node_modules/swiper/swiper-bundle.js",
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
  .pipe(dest('docs/images'))
}

function build() {
  return src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ], {base: 'app'})
  .pipe(dest('docs'))
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
  watch(['app/*.njk'], nunjucks);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
  watch(['app/images/icons/*.svg'], svgSprites)
  watch(['app/**/*.html']).on('change', browserSync.reload)
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.nunjucks = nunjucks; 
exports.cleanDist = cleanDist;
exports.svgSprites = svgSprites;
exports.build = series(cleanDist, images, build);

exports.default = parallel(nunjucks, svgSprites, styles, scripts, browsersync, watching)