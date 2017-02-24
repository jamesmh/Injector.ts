//Configure injection...
var $injector = require('../dist/index').Injector;
var http  = { get: "I'm a http service." };
var router = { get: "I'm a router."};

$injector.registerSingleton("HttpService", http)
	.registerSingleton("RouterService", router);

export { $injector, http, router };