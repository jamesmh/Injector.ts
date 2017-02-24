"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var index_1 = require("../src/index");
var MockInstance1 = (function () {
    function MockInstance1() {
    }
    MockInstance1.prototype.mock = function () {
        return "instance1";
    };
    return MockInstance1;
}());
MockInstance1 = __decorate([
    index_1.Injectable("Mock1")
], MockInstance1);
var MockInstance2 = (function () {
    function MockInstance2() {
    }
    MockInstance2.prototype.mock = function () {
        return "instance2";
    };
    return MockInstance2;
}());
MockInstance2 = __decorate([
    index_1.Injectable("Mock2")
], MockInstance2);
var Singleton1 = (function () {
    function Singleton1() {
    }
    Singleton1.prototype.mock = function () {
        return "singleton1";
    };
    return Singleton1;
}());
Singleton1 = __decorate([
    index_1.InjectableSingleton("Singleton1")
], Singleton1);
// @Inject()
// class InjectedInto {
//     public instance1: Instance;
//     public instance2: Instance;
//     constructor(Mock1?, Mock2?){
//         this.instance1 = Mock1;
//         this.instance2 = Mock2;
//     }
// }
// const injectedInto = new InjectedInto();
//tests
// describe('Instance dependencies injected', () => {
//     it('Has instance 1', () => {
//     expect(injectedInto.instance1.mock()).toBe("instance1");
//   });
//     it('Has instance 2', () => {
//     expect(injectedInto.instance2.mock()).toBe("instance2");
//   });
// });
describe('test', function () { it('test', function () { expect(true); }); });
//# sourceMappingURL=decoratorTests.js.map