/* tiny-promise.js v1.0.0 Licensed under the MIT license. (c) 2014 rtsan */
(function(root, factory) {
    if (typeof module !== 'undefined' &&
            typeof module.exports !== 'undefined') {

        exports = module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.Promise = factory();
    }
}(this, function(undef) {
    function _resolve(promise, x) {
        var then, proxy;

        if (promise === x) {
            return promise.reject(new TypeError());
        }

        try {
            if (typeof x === 'function') {
                then = x.then || x;
            } else if (typeof x === 'object' && x !== null) {
                then = x.then;
            }
        } catch (err) {
            return promise.reject(err);
        }
        // The idea is from "Promises, Promises..." http://promises.codeplex.com
        if (typeof then === 'function') {
            proxy = Promise();
            proxy.then(function(v) {
                _resolve(promise, v);
            }, promise.reject);

            try {
                then.call(x, proxy.resolve, proxy.reject);
            } catch (err) {
                proxy.reject(err);
            }
        } else {
            promise.resolve(x);
        }
    }

    function Promise() {
        var fulfilled,
            _ = {},
            chains = [],
            decide = function(status, decision) {
                if (!fulfilled) {
                    fulfilled = true;
                    _.status = status;
                    _.decision = decision;

                    while (chains.length) {
                        (chains.shift())();
                    }
                }
            },
            chain = function(next, onfulfilled, onrejected) {
                return function() {
                    setTimeout(function() {
                        var then = (_.status ? onfulfilled : onrejected),
                            propagate = (_.status ? next.resolve : next.reject);

                        try {
                            if (typeof then === 'function') {
                                _resolve(next, then.call(undef, _.decision));
                            } else {
                                propagate(_.decision);
                            }
                        } catch (err) {
                            next.reject(err);
                        }
                    }, 1);
                };
            };

        return {
            resolve: function(value) { decide(true, value); },
            reject: function(reason) { decide(false, reason); },
            then: function(onfulfilled, onrejected) {
                var next = Promise(),
                    chained = chain(next, onfulfilled, onrejected);

                if (fulfilled) {
                    chained();
                } else {
                    chains.push(chained);
                }

                return next;
            }
        };
    }

    return Promise;
}));
