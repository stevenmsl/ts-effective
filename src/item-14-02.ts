/* 
    Item 14: Use Type Operations and Generics to Avoid Repeating Yourself
    
*/

/*
    - in code you use functions (refactor the duplicate logic 
        into a reusable function) to avoid repeating yourself; 
      in type design you use generics 
*/

interface Name {
  first: string;
  last: string;
}

interface NameAndAge extends Name {
  age: number;
}

/*
  - T can be Name or NameAndAge;
  - you only need to define it once 
    if using generic
  - Any new types will work if they 
    extend Name  
*/
type DancingDuo<T extends Name> = [T, T]; // generic tuple

/*
    - You need to write out the generic parameter
      in a type declaration
    - so const couple1: DancingDuo won't work as 
      you didn't specify what T is    
*/
const couple1: DancingDuo<Name> = [
  { first: "Fred", last: "Astaire" },
  { first: "Ginger", last: "Rogers" },
];

/*
    - what if you don't want to write out 
      the generic parameter?
    - you can define an identity function and 
      let TS infer the type of the generic 
      parameter for you
*/

// you are defining an anonymous generic arrow function
const dancingDuo = <T extends Name>(x: DancingDuo<T>) => x;

// this approach allows you to have excess
// properties such as 'age' though
const couple2 = dancingDuo([
  { first: "Fred", last: "Astaire", age: 100 },
  { first: "Ginger", last: "Rogers" },
]);

// you still can write out the generic type parameter
// but it won’t allow you to have excess properties 'age'
const couple4 = dancingDuo<Name>([
  { first: "Fred", last: "Astaire" },
  { first: "Ginger", last: "Rogers" },
]);

const couple3 = dancingDuo<NameAndAge>([
  { first: "Fred", last: "Astaire", age: 100 },
  { first: "Ginger", last: "Rogers", age: 100 },
]);

/*
    - it hepls to read "extends" as "subset of"
    - keyof Will create a union type that is a 
      collection of literal types. Property names
      are used to create those literal types.
    - for example keyof NameAndAge will give you 
      "age"|"first"|"last"  
*/

type keys = keyof NameAndAge;

// The keys you pick must be
// a subset of the keys type T has
type Pick2<T, K extends keyof T> = {
  [k in K]: T[k];
};

// type is { first:string; age:number }
type firstAge = Pick2<NameAndAge, "first" | "age">;
