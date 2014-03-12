module.exports = function(grunt) {
    'use strict';

    var files = [
        'package.json',
        '.jshintrc',
        'Gruntfile.js',
        'tiny-promise.js',
        'adapter.js',
        'tasks/**/*.js'
    ];

    grunt.initConfig({
        jshint: {
            options: grunt.file.readJSON('.jshintrc'),
            src: files
        },
        watch: {
            files: files,
            tasks: 'default'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadTasks('./tasks/');

    grunt.registerTask('default', [ 'jshint', 'test' ]);
};
