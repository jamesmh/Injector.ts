var utils_1 = require('./utils');
var _regExInsideParentheses = /[(][^)]*[)]/;
var _regExParenthesesAndSpaces = /[()\s]/g;
var _getArgumentNames = function (functionString) { return _regExInsideParentheses.exec(functionString)[0].replace(_regExParenthesesAndSpaces, "").split(','); };
/**
 * Class that provides dependency injection for vanilla js.
 */
var Injector = (function () {
    /**
     * Create a new instance of the Injector.
     * @return {object} The new instance, to be chained if needed.
     */
    function Injector() {
        var _this = this;
        this._register = function (keyOrPOJO, object, isSingleton) {
            if (isSingleton === void 0) { isSingleton = false; }
            // Called as one registration with key and object.
            if (typeof (keyOrPOJO) === "string") {
                var key = keyOrPOJO;
                _this._dependencies[key] = { dependency: object, singleton: isSingleton };
            }
            else {
                var configObject = keyOrPOJO;
                utils_1.forEachPropertyDoAction(configObject, function (key, property) {
                    _this._dependencies[key] = { dependency: property, singleton: isSingleton };
                });
            }
            return _this;
        };
        this._dependencies = {};
        return this;
    }
    ;
    /**
     * Register a new dependency for injection.
     * @param  {string} keyOrPOJO   Key of the dependency, javascript object with multiple dependencies defined.
     * @param  {object} object 		The dependency object.
     * @return {object}        		The Injector instance.
     */
    Injector.prototype.register = function (keyOrPOJO, object) {
        return this._register(keyOrPOJO, object, false);
    };
    ;
    /**
     * Register a new singleton dependency.
     *
     * @param {any} keyOrPOJO	Key of the dependency, javascript object with multiple dependencies defined.
     * @param {any} object		The dependency object.
     * @returns {object}		The Injector instance.
     *
     * @memberOf Injector
     */
    Injector.prototype.registerSingleton = function (keyOrPOJO, object) {
        return this._register(keyOrPOJO, object, true);
    };
    ;
    /**
     * Returns the dependencies for the supplied function.
     * Details: The function is converted to it's string (code), parsed with regex to find
     * 	the argument names, and then those names are used to fetch the respective objects
     * 	that were registered with the Injector.
     * @param  {function} funct Function to get dependencies for.
     * @return {object}       Object holding the dependencies.
     */
    Injector.prototype.inject = function (funct) {
        var _this = this;
        var dependenciesToInject = {};
        _getArgumentNames(funct.toString())
            .map(function (argName) {
            var registered = _this._dependencies[argName];
            dependenciesToInject[argName] = registered.singleton ? registered.dependency : new registered.dependency();
        });
        return dependenciesToInject;
    };
    ;
    return Injector;
})();
exports.default = new Injector();
//# sourceMappingURL=injector.js.map