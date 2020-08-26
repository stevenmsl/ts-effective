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
  - you are evolving any types when you write to them
  - you can't however read from them if they're still
    any.
  - in the following example in the "if" branch you 
    are returning const "out" while its type is still 
    any. This will cause an error.    
*/

/*
function range2(start: number, limit: number) {
  const out = [];
  //    ~~~ Variable 'out' implicitly has type 'any[]' in some
  //        locations where its type cannot be determined
  if (start === limit) {
    return out;
    //     ~~~ Variable 'out' implicitly has an 'any[]' type
  }
  for (let i = start; i < limit; i++) {
    out.push(i);
  }
  return out;
}
*/

/*
  - implicit any types do not evolve through 
    function calls 
*/

function range3(start: number, limit: number) {
  const out = []; // Type is any[]
  for (let i = start; i < limit; i++) {
    out.push(i); // Type of out is any[]
  }
  return out; // Type is number[]
}

/*
function makeSquares(start: number, limit: number) {
  const out = [];
  // ~~~ Variable 'out' implicitly has type 'any[]' in some locations
  range3(start, limit).forEach((i) => {
    out.push(i * i);
  });
  return out;
  // ~~~ Variable 'out' implicitly has an 'any[]' type
}
*/
