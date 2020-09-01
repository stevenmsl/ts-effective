/* 
    Item 50: Prefer Conditional Types to Overloaded Declarations  
             
*/

/*
  Things to remember: 
  - Prefer conditional types to overloaded type declarations.
    By distributing over unions, conditional types allow your
    declarations to support union types without additional 
    overloads.
*/

/*
  - overloading could produce accurate but imprecise declaration  
*/

function double(x: number | string): number | string;
function double(x: any) {
  return x + x;
}
// the types are imprecise

// the type should be just number
const num = double(12); // string | number

// the type should be just string
const str = double("x"); // string | number

/*
  - first attempt: using a generic
  - the resulting types are too narrow
*/

function double2<T extends number | string>(x: T): T;
function double2(x: any) {
  return x + x;
}

// oops - types are too narrow now
const num2 = double2(12); // Type is 12
const str2 = double2("x"); // Type is "x"

/*
  - second attempt: add more type declarations 
*/

function double3(x: number): number;
function double3(x: string): string;
function double3(x: any) {
  return x + x;
}

// so looks we are fine here
const num3 = double3(12); // Type is number
const str3 = double3("x"); // Type is string

// not quite...
// you can't use union types any more:
function f(x: number | string) {
  /*
    - the call should be safe but it's not 
      allowed here
    - the reason for that is TS can't find a match
      when it processes the declarations one by one 
  */
  // return double3(x);
  //              ~ Argument of type 'string | number' is not assignable
  //                to parameter of type 'string'
}

/*
  - third attempt: use a conditional type
  -  
*/

function double4<T extends number | string>(
  x: T
): T extends string ? string : number;
function double4(x: any) {
  return x + x;
}

const num4 = double4(12); // Type is number
const str4 = double4("x"); // Type is string

// it works now

/*
  - how conditional types distibute over unions
       (number|string) extends string ? string : number
    -> (number extends string ? string : number) |
       (string extends string ? string : number)
    -> number | string

*/

function f4(x: number | string) {
  return double(x);
}
