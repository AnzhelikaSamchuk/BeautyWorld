const { src, dest, series, watch, parallel } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpackStream = require('webpack-stream');
const rename = require('gulp-rename');

const SRC_PATH = 'src';
const DIST_PATH = 'dist';

const PATHS = {
	scss: `${SRC_PATH}/scss/**/*.scss`,
	html: `${SRC_PATH}/**/*.html`,
	js: `${SRC_PATH}/js/index.js`,
	images: `${SRC_PATH}/images/**/*.*`
};

//Таск компиляции SASS в CSS
function buildScss() {
	return src(PATHS.scss)
		.pipe(sourcemaps.init())
		.pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
		.pipe(
			postcss([
				autoprefixer({ grid: true }),
				cssnano()
			])
		)
		.pipe(sourcemaps.write())
		.pipe(dest(`${SRC_PATH}/css`))
		.pipe(dest(`${DIST_PATH}/css`))
		.pipe(browserSync.stream());
}

// Таск транспиляции JS файлов
function buildJS() {
	return src(PATHS.js)
		.pipe(webpackStream(require('./webpack.config.js')))
		.pipe(rename('main.min.js'))
		.pipe(dest(`${SRC_PATH}/js`))
		.pipe(dest(`${DIST_PATH}/js`))
		.pipe(browserSync.stream());
}

// Таск работы с html файлами
function buildHtml() {
	return src(PATHS.html).pipe(dest(DIST_PATH)).pipe(browserSync.stream());
}

//Таск для копирования статичных файлов
function copy() {
	return src([PATHS.images], { base: SRC_PATH }).pipe(dest(DIST_PATH));
}

//Таск очистки dist
function cleanDist() {
	return del(DIST_PATH);
}

//следить за исх. файлами и выполнять task
function serve() {
	watch(PATHS.scss, buildScss);
	watch(PATHS.html, buildHtml);
	watch(PATHS.js, buildJS);
}

// Создание дев-сервера
function createDevServer() {
	browserSync.init({
		server: SRC_PATH,
		notify: false
	})
}

/*exports.sass = buildScss;
exports.html = buildHtml;
exports.copy = copy;*/

exports.build = series(cleanDist, buildScss, buildJS, buildHtml, copy);
exports.default = series([buildScss, buildJS], parallel(createDevServer, serve));
