var injector_1 = require('../injector');
/**
 * Class decorator: Make this class injectable with the given key.
 *
 * @export
 * @param {any} injectionKey
 * @returns
     */
function Injectable(injectionKey) {
    return function (target) {
        injector_1.default.register(injectionKey, target);
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=injectable.js.map