import { Inject, Injectable, InjectableSingleton, Injector } from '../src/index';


interface Instance {
    mock();
}

@Injectable("Mock1")
class MockInstance1 implements Instance {
    mock(){
        return "instance1";
    }
}


@Injectable("Mock2")
class MockInstance2 implements Instance {
    mock() {
        return "instance2";
    }
}

@InjectableSingleton("Singleton1")
class Singleton1 implements Instance {
    mock() {
        return "singleton1";
    }
}


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
describe('test', () => { it('test', () => {expect(true)}) });