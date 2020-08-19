/* 
    Item 34: Prefer Incomplete Types to Inaccurate Types
*/

/*
  Things to remember: 
  - Avoid the uncanny valley of type safety: incorrect types
    are often worse no types. 
  - If you cannot model a type accurately, do not model it 
    inaccurately! Acknowledge the gaps using any or unknown. 
  - Pay attention to error messages and autocomplete as you
    make typings increasingly precise. It's not just about
    correctness: developer experience matters, too.
*/

/*
  example background
   - you are trying to write type declarations for a 
     Lisp-like languages defined in JSON.
   - sample expression: ["**", 2, 31]
   - this means a function named ** takes two parameters.
   - we want to label this as an error with a message 
     read somehow like this: no "**" function so 
     developers can fix the expression easily.
*/

/*
  first attempt
*/
type Expression2 = number | string | any[];

// fails to detect the error
const test2: Expression2 = ["**", 2, 31];

/*
  second attempt 
*/
type FnName = "+" | "-" | "*" | "/" | ">" | "<" | "case" | "rgb";
type CallExpression = [FnName, ...any[]];
type Expression3 = number | string | CallExpression;

/* 
  - now we get an error saying "**" is not assignable
    to type FnName, which is clear and hence fine.
  - note: uncomment the code to see the error
*/

// const test3: Expression3 = ["**", 2, 31];

/*
  third attempt
   - we also want to check the number of parameters. 
   - you put a lot of effort to refine the types
   - but it gets worse as the error message becomes
     obscure
   - this is not helping for developers who are
     using the types you defined
*/
type Expression4 = number | string | CallExpression2;
type CallExpression2 = MathCall | CaseCall | RGBCall;

interface MathCall {
  0: "+" | "-" | "/" | "*" | ">" | "<";
  1: Expression4;
  2: Expression4;
  length: 3;
}

interface CaseCall {
  0: "case";
  1: Expression4;
  2: Expression4;
  3: Expression4;
  length: 4 | 6 | 8 | 10 | 12 | 14 | 16; // etc.
}

interface RGBCall {
  0: "rgb";
  1: Expression4;
  2: Expression4;
  3: Expression4;
  length: 4;
}

// now the error message becomes:
// Type nuumber is not assignable to
// type string

//const test3: Expression4 = ["**", 2, 31];
