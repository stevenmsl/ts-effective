/* 
    Item 40: Hide Unsafe Type Assertions in Well-Typed Functions
*/

/*
  Things to remember: 
  - Sometimes unsafe type assertions are necessary or expedient.
    When you need to use one, hide it inside a function with a
    correct signature.
*/

/*
  example background
  - you want to make a function cache its last call.
*/

/*
  - declaration is easy to write
*/

//declare function cacheLast<T extends Function>(fn: T): T;

declare function shallowEqual(a: any, b: any): boolean;
/*
  - implementation is difficult to be completely type safe
  - first attempt
  - TS has no reason to believe (...args: any[]) => any
    has any relation to T   
*/

/*
function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;
  return function (...args: any[]) {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~
    //          Type '(...args: any[]) => any' is not assignable to type 'T'
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  };
}
*/

/*
  - second attempt 
  - there are quite a few any types hidden in the 
    implementation
  - this is fine as you know the type system will
    enforce that it's called with the right parameters
    (the return type is T)
  - type assertion is fine in this case as everything 
    is under your control and you don't expect too
    many problems   
*/
function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;
  return (function (...args: any[]) {
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  } as unknown) as T; // use type assertion
}
