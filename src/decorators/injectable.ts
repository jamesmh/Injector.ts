import Injector from '../injector';

/**
 * Class decorator: Make this class injectable with the given key.
 * 
 * @export
 * @param {any} injectionKey
 * @returns
     */
export function Injectable(injectionKey) {
    return function(target) {
        Injector.register(injectionKey, target);
    }
}
