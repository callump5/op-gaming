import gulp from 'gulp';
import sass from 'gulp-sass';
import maps from 'gulp-sourcemaps';
import minify from 'gulp-clean-css';
import broswerSync from 'browser-sync';
import del from 'del';

const server = broswerSync.create();

const paths = {
    scss: {
        files: 'src/scss/**/*.scss',
        src: 'src/scss/main.scss',
        dist: 'web/assets/dist/css'
    },

    templates: {
        src: 'templates/**/*.twig'
    },

    vendor: {
        boostrap: {
            src: 'node_modules/bootstrap/dist/css/bootstrap.css',
            dist: 'web/assets/dist/css'
        },
        jquery: {
            src: 'node_modules/jquery/dist/jquery.js',
            dist: 'web/assets/dist/js'
        }
    }
}

// SERVER FUNCTIONS
// Init Server (ENTER SERVER LOCATION)
export const serve = (done) => {
    server.init({
        proxy: "http://op-gaming.cal"
    });
    done();
}
// Reload Server
export const reload = (done) => {
    server.reload();
    done();
}


// SCSS FUNCTIONS
// Convert SCSS to CSS
export const styles = () => {
    return gulp.src(paths.scss.src)

        .pipe(maps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(maps.write())
        .pipe(gulp.dest(paths.scss.dist))
        .pipe(server.stream())
}

// COPY FUNCTIONS
// Copy Vendor CSS
export const copyVendorCss = () => {
    return gulp.src(paths.vendor.boostrap.src)
        .pipe(gulp.dest(paths.vendor.boostrap.dist))
    
}
// Copy Vendor JS
export const copyVendorJs = () => {
    return gulp.src(paths.vendor.jquery.src)
        .pipe(gulp.dest(paths.vendor.jquery.dist))
} 

// Copy Vendor Files
export const copyVendorFiles = (done) => {
    copyVendorCss();
    copyVendorJs();
    done();
}


// Watch For Changes
export const watch = () => {
    gulp.watch(paths.templates.src, reload);
    gulp.watch(paths.scss.files, styles);
}

// Dev Function
export const dev = gulp.series( serve, watch);


//Gulp Default
export default dev;
