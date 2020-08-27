/* 
    Item 42: Use unknown instead of any for Values with 
             an Unknown Type 
             
*/

/*
  Things to remember: 
  - The unknown type is a type-safe alternative to any.
    Use it when you know you have a value but do not 
    know what its type is.
  - Use unknown to force your users to use a type assertion
    or do type checking.
  - Understand the difference between {}, object, and unknown.
*/

interface Geometry2 {}
interface Feature2 {
  id?: string | number;
  geometry: Geometry2;
  // a grab-bag of anything JSON serializable
  // so unknown makes sense
  properties: unknown;
}

// you can use instanceof to recover
// from an unknown object
function processValue(val: unknown) {
  if (val instanceof Date) {
    val; // Type is Date
  }
}

// you can also use user-defined guard
// to recover from unknown object
function isBook(val: unknown): val is Book {
  return (
    /* 
      - TS is quite strict in narrowing an unknwon type. 
      - You must check if it's an object and
        it is not null first; this will narrow the 
        the type from unknown to object
      - and you can then check if certain properties
        exist 
    */
    typeof val === "object" && val !== null && "name" in val && "author" in val
  );
}
function processValue2(val: unknown) {
  if (isBook(val)) {
    val; // Type is Book
  }
}

/*
  alternatives to the unknown type
  - {} consists of all values except null and undefined
  - the object type consists of all non-primitive types.
*/
