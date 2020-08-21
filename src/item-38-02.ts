/* 
    Item 38: Use the Narrowest Possible Scope for any Types
*/

/*
  Things to remember: 
  - Make your use of any as narrowly scoped as possible
    to avoid undesired loss of type safety elsewhere 
    in your code.
  - Never return an any type from a function. This will
    silently lead to the loss type safety for any client
    calling the function.
  - Consider @ts-ignore as an alternative to any if you 
    need to silence one error
*/

/*
  example background
  - you get a type error for just one property in a larger object.
    
*/

interface Foo2 {
  foo: string;
}
interface Bar2 {
  bar: string;
}
declare function expressionReturningFoo2(): Foo2;
function processBar(b: Bar2) {
  /* ... */
}
interface Config {
  a: number;
  b: number;
  c: {
    key: Foo;
  };
}
declare const value: Bar2;

/*
  - throwing an as any around the whole
    config object
  - to my surprise the type of property
    a or b even c has not changed
  - maybe TS has been improved or the author
    misunderstands the behavior?  
*/
const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value, // error has been silenced
  },
} as any; // Don't do this!

config.a; // type is number
config.c.key; // type is foo
config; // type is Config

/*
  - more narrowly scoped
*/

const config2: Config = {
  a: 1,
  b: 2,
  c: {
    key: value as any, // error has been silenced
  },
};

config2.a; // type is number
config2.c.key; // type is foo
