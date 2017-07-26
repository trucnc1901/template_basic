;
(function () {
  "use strict";

  const srcDir = "./src",
    buildDir = "./dist";

  const gulp = require("gulp"),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    uglify = require("gulp-uglify"),
    jsonminify = require('gulp-jsonminify'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    pleeease = require('gulp-pleeease'),
    del = require('del'),
    browser = require('browser-sync');

  // =============================================
  // server
  //
  gulp.task("server", function () {
    browser({
      server: {
        baseDir: buildDir
      }
    });
  });

  // =============================================
  // sass
  //
  var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
  };

  var opts = {
    minifier: false,
    mqpacker: true,
    import: false,
    browsers: [
      'last 2 versions',
      'ie >= 9',
      'safari >= 5',
      'ios >= 7',
      'android >= 4'
    ]
  };

  gulp.task("sass", function () {
    gulp.src([
        srcDir + '/**/*.scss',
        srcDir + '/**/*.css'
      ], {
        base: srcDir
      })
      .pipe(sass(sassOptions).on('error', sass.logError)) // Passes it through a
      .pipe(pleeease(opts))
      .pipe(gulp.dest(buildDir))
      .pipe(browser.reload({
        stream: true
      }));
  });

  // =============================================
  // image min
  //
  gulp.task("imagemin", function () {
    return gulp.src([srcDir + "/**/*.png", srcDir + "/**/*.jpg"])
      .pipe(imagemin())
      .pipe(gulp.dest(buildDir))
      .pipe(browser.reload({
        stream: true
      }));
  });

  // =============================================
  // html
  //
  gulp.task("html", function () {
    return gulp.src([srcDir + "/**/*.html"])
      .pipe(gulp.dest(buildDir))
      .pipe(browser.reload({
        stream: true
      }));
  });

  // =============================================
  // js
  //
  gulp.task('jshint', function () {
    return gulp.src([srcDir + "/**/*.js"])
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(gulp.dest(buildDir))
      .pipe(browser.reload({
        stream: true
      }));
  });
  // =============================================
  // Cleaning
  //
  gulp.task('clean', function () {
    return del.sync('dist').then(function (cb) {
      return cache.clearAll(cb);
    });
  })

  gulp.task('clean:dist', function () {
    return del.sync(['dist/**/*', '!dist/img', '!dist/img/**/*']);
  });
  // =============================================
  // default
  //
  gulp.task("default", ["clean:dist", "html", "sass", "imagemin", "jshint", "server"], function () {
    gulp.watch([srcDir + "/**/*.scss"], ["sass"]);
    gulp.watch([srcDir + "/**/*.png", srcDir + "/**/*.jpg"], ["imagemin"]);
    gulp.watch([srcDir + "/**/*.js"], ["jshint"]);
    gulp.watch([srcDir + "/**/*.html"], ["html"]);
  });
})();
