var injector_1 = require('../injector');
/**
 * Class decorator: Make this class Injectable with the given key (as singleton).
 *
 * @export
 * @param {any} injectionKey
 * @returns
 */
function InjectableSingleton(injectionKey) {
    return function (target) {
        injector_1.default.registerSingleton(injectionKey, new target());
    };
}
exports.InjectableSingleton = InjectableSingleton;
//# sourceMappingURL=injectableSingleton.js.map