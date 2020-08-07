/* 
    Item 23: Create Objects All at Once
    
*/

/*
  - once you declared a object literal its type has 
    been decided, and you cannot add new properties
    to it 
*/
const pt = {}; // type is {}
// error: x does not exist on {}
//pt.x = 3

/*
  - build the object all at once
*/
interface Point {
  x: number;
  y: number;
}
// set all properties at once
const pt2: Point = {
  x: 3,
  y: 4,
};

/*
  - avoid multiple steps when build a larger object 
    from smaller ones
*/

const pt3 = { x: 3, y: 4 };
const id = { name: "Pythagoras" };
const namedPoint = {}; // type is {}; you cannot add new properties
Object.assign(namedPoint, pt, id); // you try to add new properties
// you cannot access the name property as it does not exist on {}
// namedPoint.name;

/*
  - use object spread operator to build the larger object all 
    at once
*/
const namedPoint2 = { ...pt3, ...id };
namedPoint2.name; // OK, type is string

/*
  - build the object piecemeal using object spread operator 
  - a roundabout way to build up an object but it allows TS
    to infer new type along the way
*/

const pt0 = {}; // type is {}
const pt1 = { ...pt0, x: 3 }; // type is { x:number}
const ptF = { ...pt1, y: 4 }; // type is { y: number; x:number}

/*
  - conditionally add a property in a type-safe way using 
    object spread operator     
*/

declare let hasMiddle: boolean;
const firstLast = { first: "Harry", last: "Truman" };
// type is
// { middle?:string; first: string; last:string; }
const president = { ...firstLast, ...(hasMiddle ? { middle: "S" } : {}) };

/*
  - conditionally add a property in a type-safe way using 
    object spread operator
  - an example that might catch you by surprise how TS
    infer the types
  - start and end properties are always defined together, 
    the union type does more accurately represent the set
    of possible values:  
    {start:number;end: number;name:string;title:string}
    |{name:string;title:string}    
       
*/

declare let hasDates: boolean;
const nameTitle = { name: "Khufu", title: "Pharaoh" };

const pharaoh = {
  ...nameTitle,
  ...(hasDates ? { start: -2589, end: -2566 } : {}),
};
// you can't access the property start:
// pharaoh.start;
// and this is not really ideal

/* 
  - so you might want both start and end properties optional
    instead 
*/

function addOptional<T extends object, U extends object>(
  a: T,
  b: U | null
): T & Partial<U> {
  // You are returning a value that
  // conform to the return type:
  // T & Partial<U>
  return { ...a, ...b };
}

const pharaoh2 = addOptional(
  nameTitle,
  hasDates ? { start: -2589, end: -2566 } : {}
);

pharaoh2.start; // type is number|undefined
