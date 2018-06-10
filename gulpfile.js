var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var clean = require('gulp-clean');
var stream = require('event-stream');
var size = require('gulp-size');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
//var deploy = require('gulp-gh-pages');


gulp.task('sass', function() {
   return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in src/scss
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'src'
      },
    })
  })

  /*gulp.task('watch', ['browserSync', 'sass'], function (){*/
    //gulp.watch('src/scss/**/*.scss', ['sass']); 

  //  gulp.watch('./src/*.html', browserSync.reload); 
  //  gulp.watch('src/js/**/*.js', browserSync.reload);  
 // });
 /* gulp.task('scripts', function() {
    return gulp.src('./app/js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./dist/js/'));
  });*/

/*gulp.task('useref', function(){
    return gulp.src('app/js/*.js')
      .pipe(useref())
      // Minifies only if it's a JavaScript file
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulp.dest('app/js/main.min.js'))
  });*/
gulp.task('styles', function() {
    return gulp.src(['src/css/*bootstrap*', 'src/css/*.css'])
    	.pipe(concat('styles.min.css'))
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(gulp.dest('production/css'));
});

gulp.task('scripts', function() {
    return gulp.src(['src/js/*.js', 'src/!js/*jquery*', 'src/!js/*bootstrap*'])
        .pipe(useref())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        /*.pipe(size({
        	title: 'size of custom js'
        }))*/
        .pipe(gulp.dest('production/js'));
    /*var jsDeps = gulp.src(['src/js/*jquery*', 'src/js/*bootstrap*'])
    	.pipe(concat('main.js'))
    	.pipe(size({
    		title: 'size of js dependencies'
    	}))
    	.pipe(gulp.dest('production/js'));
    stream.concat(js, jsDeps);*/
});

//gulp.task('deploy', function () {
  //  return gulp.src("./dist/**/*")
   //   .pipe(deploy())
 // });

  
gulp.task('images', function () {
    return gulp.src(['src/img/*', 'src/!img/*.db'])
        .pipe(cache(imagemin({
        	optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(size({
        	title: 'size of img'
        }))
        .pipe(gulp.dest('src/img'));
});

gulp.task('clean', function() {
    return gulp.src(['css', 'js', 'images'], {read: false})
      .pipe(clean());
  });

  gulp.task('watch', function() {
    browserSync.init({
        server: {
          baseDir: 'src'
        },
      })
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/css/*.css', ['styles']);
    gulp.watch('src/img/*', ['images']);
    
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});