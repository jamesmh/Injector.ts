import Injector from '../injector';

/**
 * Class decorator: Make this class Injectable with the given key (as singleton).
 * 
 * @export
 * @param {any} injectionKey
 * @returns
 */
export function InjectableSingleton(injectionKey) {
    return function(target) {
        Injector.registerSingleton(injectionKey, new target());
    }
}