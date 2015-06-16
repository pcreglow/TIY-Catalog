var gulp = require('gulp');

gulp.task('do-something', function(){
  console.log(arguments);
  console.log('I did something!');

});

gulp.task('sass', function(){
  /*var sass = require('node-sass');

  sass.render({
    file: 'src/scss/main.scss',
    outFile: 'src/css/main.css'

  });*/

  var sass = require('gulp-sass');

  gulp.src('src/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css/'))
    .pipe(sass({outputStyle: 'compressed' }))
    .pipe(gulp.dest('dist/css/'))
});

gulp.task('watch', function(){
  gulp.watch('src/scss/*.scss', [ 'sass' ], function(){
    console.log('They changed something..');
  });
  gulp.watch('src/*.html', [ 'build' ]);
})

gulp.task('clean', function(done){
  var del = require('del');
  del([
    'dist/**/*',
    'dist/**/.*',
    '!dist/.gitignore'
  ], done);
});

gulp.task('build', [ 'clean', 'sass' ], function(){
  gulp.src([
    'src/*', '!src/scss'
    ]) // gulp.from()
  .pipe(gulp.dest('dist/')); // gulp.into

});
