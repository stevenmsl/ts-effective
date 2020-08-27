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

/* 
  - we don't know what the return type is so
    it's tempting to make it any
  - violates Item 38
*/
function parseYAML(yaml: string): any {
  // ...
}
interface Book {
  name: string;
  author: string;
}

// with type declaration it looks fine
// - type checking is working
const book: Book = parseYAML(`
  name: Wuthering Heights
  author: Emily Brontë
`);

// but without type declaration
const book2 = parseYAML(`
  name: Wuthering Heights
  author: Emily Brontë
`);

alert(book2.title); // No error, alerts "undefined" at runtime
// No error, throws "TypeError: book is not a
// function" at runtime
book2("read");

/*
  - Any types is assignable to the any type. (the any type is a superset) 
  - The any type is assignable to any other types. (the any type is a subset)
  - so this behavior disables the TS type checking 
*/

/*
  - a safer alternative
  - the any type is assignable to the unknown type
  - the unknown type is assignable only to the 
    unknown type and the any type.
  - you can't do much with the unknown type, which 
    is the point (comparing to the any type).
  - type assertion is required: you need to know 
    more about the resulting object than TS does  

*/
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml); // any is assignable to unknown
}

// type checking works
/*
alert(book.title);
   // ~~~~ Object is of type 'unknown'
book("read");
// ~~~~~~~~~~ Object is of type 'unknown'
*/
