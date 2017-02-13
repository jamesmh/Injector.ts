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

/**
 * Class decorator: Make this class Injectable with the given key (as singleton).
 * 
 * @export
 * @param {any} injectionKey
 * @returns
 */
export function InjectableSingleton(injectionKey) {
    return function(target) {
        Injector.registerSingleton(injectionKey, target);
    }
}

/**
 * Inject the dependencies of this class's constructor as properties on the object.
 * 
 * @export
 * @param {any} target
 */
export function Inject(target){
    return function(){
        const dependencies = Injector.inject(this.constructor);
        const dependencyArray: any[] = [];
        for(let key of Object.keys(dependencies)){
            dependencyArray[key] = dependencies[key]; 
        }
        this.constructor(...dependencies);
    }
}