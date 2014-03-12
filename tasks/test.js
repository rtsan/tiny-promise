'use stcict';

module.exports = function(grunt) {
    grunt.registerTask('test', 'run promises-aplus-tests', function() {
        var promisesAplusTests = require('promises-aplus-tests'),
            adapter = require('./../adapter'),
            option = { reporter: 'spec' },
            done = this.async();

        promisesAplusTests(adapter, option, function(err) {
            done(!err);
        });
    });
};
