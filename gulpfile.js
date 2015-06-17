var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('serve',['sass'], function(){
  browserSync.init({
    server: "src/"
  });

  gulp.watch("src/scss/*.scss", ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload), [ 'build' ];
  gulp.watch("src/js/**/*.js").on('change', browserSync.reload), ['build'];
});

gulp.task('sass', function(){

  gulp.src('src/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css/'))
    .pipe(sass({outputStyle: 'compressed' }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream())

});

gulp.task('clean', function(done){
  var del = require('del');
  del([
    'dist/**/*.*',
    'dist/**/.*',
    'dist/*.*',
    'dist/*',
    '!dist/.gitignore'
  ], done);
});

gulp.task('build', [ 'clean', 'sass' ], function(){
  gulp.src([
    'src/*', '!src/scss'
    ]) // gulp.from()
  .pipe(gulp.dest('dist/')); // gulp.into

});
