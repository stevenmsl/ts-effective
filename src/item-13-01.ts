/*
    Item 13 - Know the Differences Between type and interface
*/

/*
    - the cases where interface and type are indistinguishable
*/

// type is a function with a property named ‘prop’
type TFnWithProperties = {
  (x: number): number;
  prop: string;
};

const fn1: TFnWithProperties = (function () {
  const func = (x: number) => x;
  func.prop = "identity";
  return func;
})();

// no difference if you define this as
// an interface instead of a type

interface IFnWithProperties {
  (x: number): number;
  prop: string;
}

const fn2: IFnWithProperties = (function () {
  const func = (x: number) => x;
  func.prop = "identity";
  return func;
})();

/* 
   - an interface can extend a type (with some limitations) 
   - a type can extend an interface    
*/

type TState = {
  name: string;
  capital: string;
};

interface IState {
  name: string;
  capital: string;
}

// an interface can extend a type
interface IStateWithPop extends TState {
  population: number;
}

// A type can extend an interface
type TStateWithPop = IState & { population: number };

/*
    a class can implement either a type or an interface
*/

class StateT implements TState {
  name = "";
  capital = "";
}

class StateI implements IState {
  name = "";
  capital = "";
}
