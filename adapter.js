(function() {
    var Promise = require('./tiny-promise');

    module.exports = {
        resolved: function(value) {
            var promise = Promise();

            promise.resolve(value);

            return promise;
        },
        rejected: function(reason) {
            var promise = Promise();

            promise.reject(reason);

            return promise;
        },
        deferred: function() {
            var promise = Promise();

            return {
                promise: promise,
                resolve: promise.resolve,
                reject: promise.reject
            };
        }
    };
}());
