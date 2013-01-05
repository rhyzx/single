//tiny middleware executor implement
//https://github.com/rhyzx/Lab/blob/master/next-async.js

/**
 * middleware is function
 * @param {Function} fn
 * @return {Function}
 *
 * @example : 
 *      next(function (v, next) {
 *          console.log(v); //log 1
 *          next(2, 3);
 *      }).next(function (a, b, next) {
 *          console.log(a+b); //log 5
 *      })(1); //run
 */
module.exports = function next(fn) {
    var first = createNext(fn)
      , last  = first;

    function executor() {
        first.apply(this, arguments);
    }

    //only expose executor
    //neither midify nor expose fisrt
    executor.next = function (fn) {
        last.next = last = createNext(fn);
        return this;
    };

    return executor;
};

//ceate a new Next object(also is function)
function createNext(fn) {
    return function Next() {
        var that = this;
        
        Array.prototype.push.call(arguments, function () { //pass context, `Next.next.bind(this)`
            Next.next.apply(that, arguments);
        });
        fn.apply(that, arguments);
    };
}
