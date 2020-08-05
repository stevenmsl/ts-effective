/* 
    Item 21: Understand Type Widening
    
*/

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

function getComponent(vector: Vector3, axis: "x" | "y" | "z") {
  return vector[axis];
}

let vec = { x: 10, y: 20, z: 30 };

/*
    - when use let keyword x’s type is inferred as string
    - this is too wide for the union type "x" | "y" | "z"
*/
let x = "x"; // "x" | "y" | "z"

// - would complain about string can not be assigned
//   to union type
// let vec2 =  getComponent(vec, x);

/*
    - there are many possibilities the inferred type can be
    - [string, number], [any, any], any[] ...
    - TS will attempt to strike a balance
    - in this case it infers the type as (string|number)[] 
    - if this is not what you want you have to control 
      the process of widening    
*/

const mixed = ["x", 1];

/*
   - use const to control the process of widening Part 1    
*/

// x2 can't be reassigned hence TS can infer its type as "x"
const x2 = "x"; // type is "x" not string
let vec3 = getComponent(vec, x2);

/*
    - type is inferred as { x: number }
    - TS treats each property as though it were assigned 
      with let
    - this means each property its value can change 
      but not its type
    - and hence x’s type is inferred as number    
*/

const v2 = {
  x: 3,
};

// - if you don’t like the inferred type and know better
// - you can use type annotation
const v3: { x: 1 | 3 | 5 } = {
  x: 3,
};

/*
    - use const to control the process of widening Part 2           
*/

const v4 = { x: 1, y: 2 }; // type is {x:number; y:number}

/*
    - use const to control the process of widening Part 3  
    - when const appears after a value TS will infer
      the narrowest possible type for it
    - there is no widening
*/

const v5 = { x: 1 as const, y: 2 }; // type is {x:1; y:number}

// type is {readonly x:1; readonly y:2}
const v6 = { x: 1, y: 2 } as const; // type is {readonly x}
