var injector_1 = require('../injector');
/**
 * Inject the dependencies of this class's constructor.
 *
 * @export
 * @param {any} target
 */
function Inject() {
    return function (target) {
        var dependencies = injector_1.default.inject(target.constructor);
        var dependencyArray = [];
        for (var _i = 0, _a = Object.keys(dependencies); _i < _a.length; _i++) {
            var key = _a[_i];
            dependencyArray[key] = dependencies[key];
        }
        target.constructor = function () { return target.constructor.apply(target, dependencies); };
        return target.constructor;
    };
}
exports.Inject = Inject;
//# sourceMappingURL=inject.js.map