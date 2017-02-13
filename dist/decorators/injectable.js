var injector_1 = require('../injector');
function Injectable(injectionKey) {
    return function (target) {
        injector_1.default.register(injectionKey, target);
    };
}
exports.Injectable = Injectable;
function InjectableSingleton(injectionKey) {
    return function (target) {
        injector_1.default.registerSingleton(injectionKey, target);
    };
}
exports.InjectableSingleton = InjectableSingleton;
//# sourceMappingURL=injectable.js.map