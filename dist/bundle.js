/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils_1 = __webpack_require__(3);
var _regExInsideParentheses = /[(][^)]*[)]/;
var _regExParenthesesAndSpaces = /[()\s]/g;
var _getArgumentNames = function (functionString) {
    return _regExInsideParentheses.exec(functionString)[0].replace(_regExParenthesesAndSpaces, "").split(',');
};
/**
 * Class that provides dependency injection for vanilla js.
 */
var Injector = function () {
    /**
     * Create a new instance of the Injector.
     * @return {object} The new instance, to be chained if needed.
     */
    function Injector() {
        var _this = this;
        this._register = function (keyOrPOJO, object, isSingleton) {
            if (isSingleton === void 0) {
                isSingleton = false;
            }
            // Called as one registration with key and object.
            if (typeof keyOrPOJO === "string") {
                var key = keyOrPOJO;
                _this._dependencies[key] = { dependency: object, singleton: isSingleton };
            } else {
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
        _getArgumentNames(funct.toString()).map(function (argName) {
            var registered = _this._dependencies[argName];
            dependenciesToInject[argName] = registered.singleton ? registered.dependency : new registered.dependency();
        });
        return dependenciesToInject;
    };
    ;
    return Injector;
}();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Injector();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var injector_1 = __webpack_require__(0);
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
/**
 * Class decorator: Make this class Injectable with the given key (as singleton).
 *
 * @export
 * @param {any} injectionKey
 * @returns
 */
function InjectableSingleton(injectionKey) {
    return function (target) {
        injector_1.default.registerSingleton(injectionKey, target);
    };
}
exports.InjectableSingleton = InjectableSingleton;
/**
 * Inject the dependencies of this class's constructor.
 *
 * @export
 * @param {any} target
 */
function Inject(target) {
    return function () {
        var dependencies = injector_1.default.inject(this.constructor);
        var dependencyArray = [];
        for (var _i = 0, _a = Object.keys(dependencies); _i < _a.length; _i++) {
            var key = _a[_i];
            dependencyArray[key] = dependencies[key];
        }
        return this.constructor.apply(this, dependencies);
    };
}
exports.Inject = Inject;

/***/ }),
/* 2 */
/***/ (function(module, exports) {



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);
/**
 * Loop through an objects own properties and execute an action.
 * Action function will be provided the current key and the property assign to that key.
 * @param  {object} obj    Object to loop through.
 * @param  {function} action Action to perform on each property.
 */
exports.forEachPropertyDoAction = function (obj, action) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            action(key, obj[key]);
        }
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var injector_1 = __webpack_require__(0);
exports.Injector = injector_1.default;
var injectable_1 = __webpack_require__(1);
exports.Injectable = injectable_1.Injectable;
exports.InjectableSingleton = injectable_1.InjectableSingleton;
exports.Inject = injectable_1.Inject;

/***/ })
/******/ ]);