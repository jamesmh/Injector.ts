import { $injector, http, router } from "../__testSrc__/jestTestsConfig";


//test proto
var protoTest = function(HttpService, RouterService){
	var { HttpService, RouterService } = $injector.inject(protoTest);
    return { HttpService, RouterService };
};

//tests
describe('Function Injection', () => {

  it('Has http service', () => {
    expect(protoTest().HttpService).toBe(http);
  });

  it('Has router service', () => {
    expect(protoTest().RouterService).toBe(router);
  });
});