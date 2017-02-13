import Injector from '../index';

function Injectable(injectionKey) {
    return function(target) {
        Injector.register(injectionKey, target);
    }
}

function InjectableSingleton(injectionKey) {
    return function(target) {
        Injector.registerSingleton(injectionKey, target);
    }
}