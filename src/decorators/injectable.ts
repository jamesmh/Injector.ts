import Injector from '../injector';

export function Injectable(injectionKey) {
    return function(target) {
        Injector.register(injectionKey, target);
    }
}

export function InjectableSingleton(injectionKey) {
    return function(target) {
        Injector.registerSingleton(injectionKey, target);
    }
}