/*
    Item 13 - Know the Differences Between type and interface
*/

/*
    - a type is more capable than an interface in general 
    - an interface can not extend union types
*/

type Input = { x1: number; x2: number };
type Output = { y1: number; y2: number };

// Define a dictionary type –
//   the key is of type string and the value
//   is of type Input or Output

interface VariableMap {
  [name: string]: Input | Output;
}

const myMap: VariableMap = {
  input1: { x1: 0, x2: 0 }, // variable with a name
  output1: { y1: 0, y2: 0 },
};

/* 
   - you want to define a type that attaches
     the name to a variable
   - this can not be done through an interface 
   - An interface cannot extend union types: 
     (Input | Output) 

 */
type NamedVariable = (Input | Output) & { name: string };
const var1: NamedVariable = { name: "input1", ...myMap["input1"] };
const var2: NamedVariable = { name: "output2", ...myMap["output1"] };

/*
   - it is easier to express tuple and array types 
   - it is awkward to use interface to define a tuple
     and you will drop all the tuple methods like concat 
*/

// use type to define a tuple
type Pair = [number, number];
const pair1: Pair = [0, 0];
const pair2 = pair1.concat([1, 1]); // type is number[]

// use interface instead
interface Tuple2 {
  0: number;
  1: number;
  length: 2;
}
// pair3 does not have the concat method
// like pair1
const pair3: Tuple2 = [0, 0];

/*
   - an interface can be augmented; a type cannot.
   - for users to fill the gap in type declarations 
*/

interface IState2 {
  name: string;
  capital: string;
}
// declaration merging
// primarily used with type declaration files
interface IState2 {
  population: number;
}

const wyoming: IState2 = {
  name: "Wyoming",
  capital: "Cheyenne",
  population: 500_000,
};
