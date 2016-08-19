 "use strict"

let gulp = require('gulp')
let nodemon = require('gulp-nodemon')
let eslint = require('gulp-eslint')
let replaceAssets = require('gulp-replace-assets')
let globalConfig = require('./global.config')

gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['server/**/*.js','!node_modules/**'])
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint({
      configFile: '.eslintrc.js'
    }))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
})

// 根据webpack生成manifest哈希映射,主要是图片,替换ejs中的引用
gulp.task('replace', () => {
  let manifest = require('./webpack.manifest.json')
  return gulp.src('server/views/**/*.ejs')
    .pipe(replaceAssets(manifest))
    .pipe(gulp.dest('server/views-dist/'))
})

// nodemon 修改服务端代码自动重启
gulp.task('nodemon', () => {
  return nodemon(require('./nodemon.json'))
})

gulp.task('serve', ['nodemon'], () => {
  setTimeout(() => {
    require('open')(['http://', globalConfig.currentIP, ':',globalConfig.appPort].join(''))
  }, 2000)
})
