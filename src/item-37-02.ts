/* 
    Item 37: Consider "Brands" for Nominal Typing
*/

/*
  Things to remember: 
  - TS uses structural typing, which can sometimes lead to 
    surprising results. If you need nominal typing, consider
    attaching "brands" to your values to distinguish them.
  - In some cases you may be able to attach brands in the 
    type system, rather than at runtime. You can use this 
    technique to model properties outside of TS's type 
    system.
*/

/*
  example background
  - you want to brand built-in types such as string or number
  - you can define the type but it's not possible to 
    create any values of this type.
  - so what's the deal?
  - you are playing a game with the type system
*/

/* 
  - you can define the type but you can't constrcut
    an object that is a string and has a _brand 
    property.
*/
type AbsolutePath = string & { _brand: "abs" };

/*
  - this function is the key to make this happen
  - note the return type is (path is AbsolutePath)
    the whole thing
  - this return type can then help TS to infer
    the type properly
*/
function isAbsolutePath(path: string): path is AbsolutePath {
  return path.startsWith("/");
}

function listAbsolutePath(path: AbsolutePath) {
  // ...
}

/*
  - how to use it 
  - your function still takes a parameter
    of type string
*/

function myF(path: string) {
  if (isAbsolutePath(path)) {
    path; // type is AbsolutePath
    listAbsolutePath(path);
  }

  /*
    - you can't call the same function outside the 
      if block as path's type is no longer AbsolutePath
      but is string instead
    - it will cause "Argument of type 'string' is not assignable
      to parameter of type 'AbsolutePath' " error.
    - uncomment the following statement to see the error 
  */
  //listAbsolutePath(path);
}
