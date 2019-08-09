const { src, dest, series, task, watch } = require("gulp")
const cleancss = require("gulp-clean-css")
var rename = require("gulp-rename")
const sass = require("gulp-sass")
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const del = require("delete")
const browsersync = require("browser-sync").create()
// 清空
function cleanTmp() {
  return del(["./dist/*.css"])
}
function cleanDocsTmp() {
  return del(["./docs/css/*.css"])
}
// scss文件编译
function docsScssCompile() {
  return src("./docs/scss/pokemon-docs.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("./docs/css"))
}

function scssCompile() {
  return src("./src/pokemon.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleancss())
    .pipe(dest("./dist"))
}

function minCss() {
  return src("./dist/pokemon.css")
    .pipe(cleancss())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(dest("./dist"))
}

// browsersync
function serve() {
  browsersync.init({
    server: {
      baseDir: "./docs",
      browser: "chrome",
      port: 3020
    },
    files: ["docs/**/*.html", "docs/**/*.css"]
  })
  watch(["src/**/*.scss", "docs/scss/*.scss"], docsScssCompile)
}

// 构建资源
task("build", series(cleanTmp, scssCompile, minCss))

// 开发环境
task("default", series(cleanDocsTmp,docsScssCompile, serve))
