/*
    Item 8: Know How to Tell Whether a Symbol Is in the Type Space
    or Value Space  
*/

/*
  - use [] to get the type Of another type’s properties
  - for example you want to get the type of the ‘first’ 
    property in the Person interface      
*/

interface Person {
  first: string;
  last: string;
  birth: Date;
}

// you can put any type in the index slot
// such as union type
type PersonEl = Person["first" | "last"]; // string
type PersonEl2 = Person["last" | "birth"]; // string | Date

type Tuple = [string, number, Date];

// you can exactly have 3 elements no more no less
const tv: Tuple = ["tv1", 0, new Date("1900-01-01")];
// check the type of each individual element
type tvEl0 = typeof tv[0]; // string
type tvEl1 = typeof tv[1]; // number
type tvEl2 = typeof tv[2]; // Date
/*
  - the following code will generate a error
  - the error say there is no element at index 3 
*/

// type tvElNotExist = typeof tv[3]; // error

/*
   - so what would the type of each individual element
     look like for this Tuple type? 
   - The type of each element can be string, number, or 
     Date and hence it's a union type string|number|Date.
   - How do you access each element you use [] with an index,
     which is of type number.
   - so that’s why you have the following expression 
     to get to the type of each element and the result type
     is a union of all primitive types used to define the 
     type of each elements in this Tuple.                
*/

type TupleEl = Tuple[number]; // string|number|Date

/* 
   - Also the resulting type will not tell you that 
     the type of the first element should be a string. 
   - When it tells you is that given an element its 
     type must be either a string, a number, or a Date; 
     it can’t be anything else    
*/
