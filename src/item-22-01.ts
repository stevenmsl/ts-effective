/* 
    Item 22: Understand Type Narrowing
    
*/

/* 
  - the most common example 
*/

// type is HTMLElement | null
const el = document.getElementById("foo");
if (el) {
  // type narrows to HTMLElement
  el.innerHTML = "Party Time".blink();
} else {
  // type narrows to null
}

/*
  - narrow a type for the rest of a block by throwing 
    or returning from a branch 
*/

// type is HTMLElement | null
const el2 = document.getElementById("foo");
// throw from the if branch
if (!el2) throw new Error("Unable to find #foo");
// type narrows to HTMLElement
el2.innerHTML = "Party Time".blink();

/*
  - narrow a type using instanceof 
*/

function contains(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    // narrows type to RegExp
    return !!search.exec(text);
  }
  // narrows type to string
  return text.includes(search);
}

/*
  - narrow a type using property check
*/
interface A {
  a: number;
}
interface B {
  b: number;
}
function pickAB(ab: A | B) {
  if ("a" in ab) {
    // type narrows to A
    const a = ab.a;
  } else {
    // type narrows to B
    const b = ab.b;
  }
  // TS can’t really narrow the type
  // if you think about it
  console.log(ab); // A|B
}

/*
  - narrow a type using built-in functions  
*/

function contains2(text: string, terms: string | string[]) {
  const termList = Array.isArray(terms)
    ? // TS can narrow the type of terms either to string[] or string
      terms // string[]
    : [terms]; // string

  // type is string[]
  console.log(termList.length);
}
