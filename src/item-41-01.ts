/* 
    Item 41: Understand Evolving any
*/

/*
  Things to remember: 
  - While TS types typically only refine, implicit any and
    any[] types are allowed to evolve. You should be able 
    to recognize and understand this construct where it 
    occurs.
  - For better error checking, consider providing an 
    explicit type annotation instead of using evolving any.
*/

/*
  - the type of out starts as any[]
  - as we push number values onto it, 
    its type evolves to become number[]
  - it looks like type narrowing but it's
    not - check the examples after this one. 
*/

function range(start: number, limit: number) {
  const out = []; // Type is any[]
  for (let i = start; i < limit; i++) {
    out.push(i); // Type of out is any[]
  }
  return out; // Type is number[]
}

/*
 - you can clearly see that the type
   is expanding from string[] to
   (string | number)[]   
*/

const result2 = []; // Type is any[]
result2.push("a");
result2; // Type is string[]
result2.push(1);
result2; // Type is (string | number)[]

/*
  - the type can vary across branches
*/
let val2; // Type is any
if (Math.random() < 0.5) {
  val2 = /hello/;
  val2; // Type is RegExp
} else {
  val2 = 12;
  val2; // Type is number
}
val2; // Type is number | RegExp

/*
  - another example 
  - type evolves from any to 
    number | null
*/

function somethingDangerous() {}
let val3 = null; // Type is any
try {
  somethingDangerous();
  val3 = 12;
  val3; // Type is number
} catch (e) {
  console.warn("alas!");
}
val3; // Type is number | null

/*
  - an explicit any keeps the type constant
    let val4: any;
*/

let val4: any; // Type is any
if (Math.random() < 0.5) {
  val4 = /hello/;
  val4; // Type is any
} else {
  val4 = 12;
  val4; // Type is any
}
val4; // Type is any
