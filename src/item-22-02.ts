/* 
    Item 22: Understand Type Narrowing
    
*/

/*
  - cases that might catch you by surprise 
*/

const el3 = document.getElementById("foo");
if (typeof el === "object") {
  // type won't be narrowed as typeof null is object
  // and the if check will not exclude the null type
  el; // type is still HTMLElement|null
}

// - null, undefined, 0, empty string are all falsy values
// - use the negation ("NOT") operator (!) will corece those
//   values to false first before applying the negation operator
// - that's why the type of x inside the if block is
//   string|nuumber|null|undefined
function foo(x?: number | string | null) {
  if (!x) {
    x; //type is string|nuumber|null|undefined
  }
}

/*
  - help the type checker narrow your types using explicit tag on them
  - also known as tagged union or discriminated union
*/

interface UploadEvent {
  type: "upload";
  filename: string;
  contents: string;
}
interface DownloadEvent {
  type: "download";
  filename: string;
}

type AppEvent = UploadEvent | DownloadEvent;

function handleEvent(e: AppEvent) {
  switch (e.type) {
    case "download":
      e; // type is DownloadEvent
      break;
    case "upload":
      e; // type is UploadEvent
      break;
  }
}

/*
  - use custom function to help TS to narrow your types - part 1
  - this is known as a user-defined type guard
*/

// el is HTMLInputElement - the whole thing is the return type
function isInputElement(el: HTMLElement): el is HTMLInputElement {
  // from implementation perspective you return a bool
  // value to the tell type checker if your type can
  // be narrowed to HTMLInputElement
  return "value" in el; // return true or false
}

function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    // user-defined type guard
    el; // type is HTMLInputElement
    return el.value;
  }
  el; // type is HTMLElement
  return el.textContent;
}

/*
  - use custom function to help TS to narrow your types - part 2
  - you do some lookups in an array, you may wind up with an array
    of nullable types.
  - you want to remove those nullable types 
*/
const jackson5 = ["Jackie", "Tito", "Jermaine", "Marlon", "Michael"];

// an array of nullable types
const members = ["Janet", "Michael"].map((who) =>
  // type returned from find is string|undefined
  jackson5.find((n) => n === who)
); // type is (string|undefined)[]

// the type checker can't help to narrow types if you use filter
// as the return type of the filter function is the same as
// the original array
// type is (string|undefined)[]
const members2 = members.filter((who) => who !== undefined);

// - you need a type gaurd to tell the type checker
// - x is T - the whole is the return type of this type
//   guard (function)
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

// now the checker knows your intentions better
// type is string[] - no more nullable types
const members3 = members.filter(isDefined);
