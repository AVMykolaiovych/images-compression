const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminGuetzli = require('imagemin-guetzli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const shell = require('gulp-shell');

gulp.task('jpegcombo', () => 
	gulp.src('src/*.jpg')
		.pipe(imagemin([imageminGuetzli({quality: 95})]))
		.pipe(imagemin([
			imageminMozjpeg({
				progressive: true,
				quality: 85,
			})
		]))
		.pipe(gulp.dest('dist'))
);

gulp.task('exif', () => 
	gulp.src('src/*.jpg', {read: false})
		.pipe(shell([
			'echo <%=file.path%>'
		]))
);

gulp.task("watch", ["jpegcombo", "exif"], function(){
	gulp.watch("src/*.jpg", ["jpegcombo"]);
	gulp.watch("src/*.jpg", ["exif"]);
});