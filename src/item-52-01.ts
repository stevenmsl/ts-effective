/* 
    Item 54: Be Aware of the Pitfalls of Testing Types   
             
*/

/*
  Things to remember: 
  - When testing types, be aware of the difference between equality
    and assignability, particularly for function types.
  - For functions that use callbacks, test the inferred types of 
    callback parameters. Don't forget to test the type of this
    if it's part of your API.
  - Be wary of any in tests involving types. Consider using a tool
    like dtslint for stricter, less error-prone checking.
*/

/*
  - you want to test the types of this function (not its implementation). 
*/

declare function map<U, V>(array: U[], fn: (u: U) => V): V[];

/*
  - this only tests the types of parameters and if any
    parameters are missing
  - it is not sufficient as you need to also test
    the return type as well  
*/

map(["2017", "2018", "2019"], (v) => Number()); // how about return type?

/*
  why you need to test return type?
  - imagine you are testing the implementation (not types) 
    of a function called square.
  - if your test is just calling the function like so:
    square(1);
  - your test is just testing you can call the function without
    throwing errors not its behavior.
  - you should actually test square(1) === 1 
  - similarly, if you are testing types you also need to 
    test the return type
*/

/*
  solution 1
  - assign the result to a variable with a specific type
  - usually has many unused variables
  - violates Item 19: Avoid cluttering Your Code with 
    Inferable Types  
*/

// checking the return type using named variables
const lengths: number[] = map(["john", "paul"], (name) => name.length);

/*
  solution 2
  - using a helper
  - we are checking assignability than equality
*/

function assertType<T>(x: T) {}

assertType<number[]>(map(["john", "paul"], (name) => name.length));

const n = 12; // type is 12
// it passes as we are checking assignability
// than equality
assertType<number>(n); // OK

const beatles = ["john", "paul", "george", "ringo"];

/* 
  - this passes as well
  -  just be aware that {name: string,  inYellowSubmarine: boolean }
     is assignable to {name: string}
*/
assertType<{ name: string }[]>(
  map(beatles, (name) => ({
    name,
    inYellowSubmarine: name === "ringo",
  }))
);

/*
  - things get trickier if the return type is a function
  - TS models JS so it's perfectly fine to call a function
    with more parameters than it's declared to take.
*/
const add5 = (a: number, b: number) => a + b;
assertType<(a: number, b: number) => number>(add5); // OK

const double5 = (x: number) => 2 * x;
assertType<(a: number, b: number) => number>(double5); // OK!?

// TS models JS so it's perfectly fine to call a function
// with more parameters than it's declared to take.
const g: (x: string) => any = () => 12; // OK

/*
  - so if you want to override this behavior what can you do?
  - test the parameter types and return type separately
*/

const double6 = (x: number) => 2 * x;

let p: Parameters<typeof double6> = null!;

// it will pass only if there is only
// one parameter in the declaration
assertType<[number]>(p);

// it will fail if there are more than one parameter
//  assertType<[number, number]>(p);
//                              ~ Argument of type '[number]' is not
//                                assignable to parameter of type [number, number]

let r: ReturnType<typeof double> = null!;
assertType<number>(r); // OK

/*
  - test the types of functions that accecpt callbacks
  - we also test the details of the intermediate steps
    (callbacks).
*/

declare function map2<U, V>(
  array: U[],
  fn: (this: U[], u: U, i: number, array: U[]) => V
): V[];

assertType<number[]>(
  map2(beatles, function (name, i, array) {
    // you also check the callback
    assertType<string>(name);
    assertType<number>(i);
    assertType<string[]>(array);
    assertType<string[]>(this);
    return name.length;
  })
);
