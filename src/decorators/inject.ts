import Injector from '../injector';

/**
 * Inject the dependencies of this class's constructor.
 * 
 * @export
 * @param {any} target
 */
export function Inject(){
    return function(constructor) {
        const dependencies = Injector.inject(function(...keys){});
        const dependencyArray: any[] = [];
        for(let key of Object.keys(dependencies)){
            dependencyArray[key] = dependencies[key]; 
        }    
        constructor = function() { constructor.call(...dependencyArray) };        
    }
}