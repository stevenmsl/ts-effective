/* 
    Item 54: Know How to Iterate Over Objects   
             
*/

/*
  Things to remember: 
  - Use let k: keyof T and a for-in loop to iterate objects
    when you know exactly what the keys will be. Be aware
    that any objects your function receives as parameters
    might have additional keys.
  - Use Object.entries to iterate over the keys and values
    of any object.
*/

const obj = {
  one: "uno",
  two: "dos",
  three: "tres",
};

// the type of key is "one"|"two"|"three"
// not string!!
let key: keyof typeof obj;

// this won't work; k's type is too broad
for (const k in obj) {
  k; // type is string, too broad for "one"|"two"|"three"
  //const v = obj[k];
  //   ~~~~~~ Element implicitly has an 'any' type
  //          because type ... has no index signature
}

// this works
for (key in obj) {
  const v = obj[key]; // OK
  v; // type is string
}

/*
  - why the type k is inferred as string in foo2? 
  - you can pass in object with additional 
    properties so TS has to assume the type of 
    key is string 
*/
interface ABC {
  a: string;
  b: string;
  c: number;
}

function foo2(abc: ABC) {
  for (const k in abc) {
    k; // type is string
    // const v = abc[k];
    // ~~~~~~ Element implicitly has an 'any' type
    //        because type 'ABC' has no index signature
  }
}

// example of why k in the foo2 needs to be of the type
// string
const x3 = { a: "a", b: "b", c: 2, d: new Date() };
foo2(x3); // OK

/*
  - this solution has a problem though: you leave out
    other additional properties such as 'd'.
  - give you false sense of certainty
  - the keyof solution works if you are pretty sure
    the object won't have additional keys and you
    want precise types. 
*/
function foo3(abc: ABC) {
  let k: keyof ABC;
  for (k in abc) {
    k; // type is "a"|"b"|"c"
    const v = abc[k];
  }
}

/*
  - Object.entries approach
  - harder to work with 
*/

function foo4(abc: ABC) {
  for (const [k, v] of Object.entries(abc)) {
    k; // Type is string
    v; // Type is any
  }
}
