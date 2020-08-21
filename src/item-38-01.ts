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
  - const x = expressionReturningFoo();  
  - you want to make x of type Foo assignable to Bar
    for whatever reason.
  - personally I can't think of any real world 
    examples that would require you to do this.  
*/

interface Foo {
  foo: string;
}
interface Bar {
  bar: string;
}
declare function expressionReturningFoo(): Foo;
function processBar(b: Bar) {
  /* ... */
}

/*
  now you want to pass what is returned from 
  expressionReturningFoo to processBar    
*/

/*
  - don't do this 
  - x is not narrowly scoped enough
  - its type changed to any from Foo 
    and remains any after the call to
    processBar
  - TS can't help you much since its 
    type is any 
*/
function f1() {
  const x: any = expressionReturningFoo(); // Don't do this
  processBar(x);
  x; // type is any
  x.fooMethod(); // TS won't complain - this is bad
}

/*
  - Prefer this 
  - The any type is scoped to a single expression
    in a function argument.    
*/

function f2() {
  const x = expressionReturningFoo();
  processBar(x as any); // Prefer this
  x; // type is Foo
  // you can't do this as TS will complain
  // x.fooMethod();
}

// you can also use @ts-ignore to silence
// the error.
function f3() {
  const x = expressionReturningFoo();
  // @ts-ignore
  processBar(x); // Prefer this
  x; // type is Foo
  // you can't do this as TS will complain
  // x.fooMethod();
}
