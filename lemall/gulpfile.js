const gulp = require("gulp");


/* 
gulp.src()  源路径
gulp.dest() 目的路径
pipe()   理解管道
*/
gulp.task("copy-html", function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})
/* 
图片
*/
gulp.task("images",function(){
    return gulp.src(["*.{img,png,jpg}","images/*.{img,png,jpg}"])
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})
/* 
    js代码  jquery 不能压缩
*/
gulp.task("scripts", function(){
    return gulp.src(["scripts/*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

//数据
gulp.task("data", function(){
    return gulp.src(["*.json", "json/*.json","!package.json"])
    .pipe(gulp.dest("dist/json"))
    .pipe(connect.reload());
})

/* 
    gulp-scss   windows gulp-sass
    gulp-minify-css
    gulp-rename
    【注】一个一个scss处理。
    方向键  上 和下 可以控制控制台指令
*/


const sass = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("sass",function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});
gulp.task("sass2",function(){
    return gulp.src("stylesheet/stylereset.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("stylereset.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
//一次执行多个任务
gulp.task("build",["copy-html","images","sass","scripts","data","sass2"],function(){
    console.log("项目链接成功");
})
//监听
gulp.task("watch", function(){
    gulp.watch("*.html", ['copy-html']);
    gulp.watch(["*.{img,png,jpg}","images/*.{img,png,jpg}"], ['images']);
    gulp.watch([ "!gulpfile.js","scripts/*.js"], ['scripts']);
    gulp.watch(["*.json", "!package.json","json/*.json"], ['data']);
    gulp.watch("stylesheet/index.scss", ['sass']);
    gulp.watch("stylesheet/stylereset.scss",["sass2"]);
})


const connect =require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:8888,
        livereload:true
    })
})
//设置一个默认任务
gulp.task("default",["watch","server"]);