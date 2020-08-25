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
  - make sure you use es2017 lib 
      "lib": [
      "es2017",
      "dom"
    ]
*/

/*
  - first attempt
  - you have just checked k is in b before accessing b[k]
  - TS still complains
*/

/*
function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
  for (const [k, aVal] of Object.entries(a)) {
    if (!(k in b) || aVal !== b[k]) {
      // ~~~~ Element implicitly has an 'any' type
      //      because type '{}' has no index signature
      return false;
    }
  }
  return Object.keys(a).length === Object.keys(b).length;
}
*/

/*
  - you have no choice but to assert b as any first 
    before accessing its property
  - this is fine as you have just checked that k 
    is in b
  - more importantly you have a correct function with
    a clear type signature
*/

function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
  for (const [k, aVal] of Object.entries(a)) {
    // type assertion
    if (!(k in b) || aVal !== (b as any)[k]) {
      return false;
    }
  }
  return Object.keys(a).length === Object.keys(b).length;
}
