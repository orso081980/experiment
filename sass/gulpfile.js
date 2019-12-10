"use strict";


const {src, dest, series, parallel, watch} = require('gulp');
const destination = 'build';
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const rename = require("gulp-rename")
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const origin = 'src';

sass.compiler = require('node-sass');

function compileSass(cb) {
	src(`${origin}/css/**/*.css`)
	.pipe(concat('superstyle.css'))
	.pipe(dest(`${destination}/css`));

	src(`${origin}/scss/style.scss`)
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'compressed'
	}))
	.pipe(sourcemaps.write())
	.pipe(dest(`${destination}/css`));
	cb();
}

function js(cb) {
	src(`${origin}/js/**/*.js`)
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(concat('build.js'))
	.pipe(dest(`${destination}/js`))
	cb();
}


function watcher(cb) {
	watch(`${origin}/**/*.scss`).on('change', series(compileSass))
	watch(`${origin}/**/*.js`).on('change', series(js))
	cb();
}


exports.compileSass = compileSass;
exports.js = js;
exports.default = series(parallel(compileSass, js), watcher);
