var gulp = require('gulp');
var bro = require('gulp-bro');
var babelify = require('babelify');


gulp.task('build', function () {
    // return buildScript('main.js', false);
    return gulp.src('./DataTable.js')
        .pipe(bro({
            transform: [
                babelify.configure({ presets: ['es2015', 'react'],
                    plugins: ['transform-react-jsx']
                }),
            ],
            error: function (err) {
                // print the error (can replace with gulp-util)
                console.log(err.message);
                // end this stream
                // this.emit('end');
            },
        }))
        .pipe(gulp.dest('build'))
    // .pipe(fs.createWriteStream('build/app.js'));
});