import { forEachPropertyDoAction } from './utils';
import DependencyArray from './Interfaces/dependencyArray';

const  _regExInsideParentheses = /[(][^)]*[)]/;
const _regExParenthesesAndSpaces = /[()\s]/g;
const _getArgumentNames = (functionString: string) : string[] => _regExInsideParentheses.exec(functionString)[0].replace(_regExParenthesesAndSpaces, "").split(',');

/**
 * Class that provides dependency injection for vanilla js.
 */
 class Injector {
	private _dependencies: DependencyArray;

	/**
	 * Create a new instance of the Injector.
	 * @return {object} The new instance, to be chained if needed.
	 */
	constructor() {
		this._dependencies = {};
		return this;
	};

	/**
	 * Register a new dependency for injection.
	 * @param  {string} keyOrPOJO   Key of the dependency, javascript object with multiple dependencies defined.
	 * @param  {object} object 		The dependency object.
	 * @return {object}        		The Injector instance.
	 */
	register(keyOrPOJO: string | Object, object: Object){
		return this._register(keyOrPOJO, object, false);
	};

	/**
	 * Register a new singleton dependency.
	 * 
	 * @param {any} keyOrPOJO	Key of the dependency, javascript object with multiple dependencies defined.
	 * @param {any} object		The dependency object.
	 * @returns {object}		The Injector instance.
	 * 
	 * @memberOf Injector
	 */
	registerSingleton(keyOrPOJO: string | Object, object: Object){
		return this._register(keyOrPOJO, object, true);
	};

	/**
	 * Returns the dependencies for the supplied function.
	 * Details: The function is converted to it's string (code), parsed with regex to find
	 * 	the argument names, and then those names are used to fetch the respective objects
	 * 	that were registered with the Injector.
	 * @param  {function} funct Function to get dependencies for.
	 * @return {object}       Object holding the dependencies.
	 */
	inject(funct: Function) {
		let dependenciesToInject: any = {};

		_getArgumentNames(funct.toString())
			.map(argName => {
				var registered = this._dependencies[argName];						
				dependenciesToInject[argName] = registered.singleton ? registered.dependency : new registered.dependency();
			});

		return dependenciesToInject;
	};

	private _register = (keyOrPOJO: any, object: Object, isSingleton: boolean = false) =>{

		// Called as one registration with key and object.
		if(typeof(keyOrPOJO) === "string"){
			const key: string = keyOrPOJO;
			this._dependencies[key] = { dependency: object, singleton: isSingleton };
		}
		// Called with multiple objects to register.
		else {
			const configObject = keyOrPOJO;
			forEachPropertyDoAction(configObject, (key, property) => {
				this._dependencies[key] = { dependency: property, singleton: isSingleton };
			});
		}

		return this;
	}
}

export default new Injector();