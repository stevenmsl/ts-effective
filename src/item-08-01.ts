/*
    Item 8: Know How to Tell Whether a Symbol Is in the Type Space
    or Value Space  
*/

interface Person {
  first: string;
  last: string;
}
/*
  - typeof always operates on values       
*/

// Person is a type not a value; typeof can’t operate on it
// type T1 = typeof Person; // error

/*
  - Class construct introduces a type and a value, and 
    that is why typeof can operate on a class but not on
    an interface 
  - the type introduced exists in TS to describe the 
    shape of the class: properties and methods.
  - The value introduced will make it to JS. It is a 
    function - constructor.   
  - this is what the constructor function looks like in JS 
    var Cylinder = (function () {
        function Cylinder() {
            this.radius = 1;
            this.height = 1;
        }
        return Cylinder;
    }());
*/

class Cylinder {
  radius = 1;
  height = 1;
}

const v = typeof Cylinder; // v is "function" - in JS

/*
  - T, which is a type, is typeof Cylinder not Cylinder
  - It is not Cylinder - the type of the instances you 
    created from the class
  - It is just the way TS describes the type of 
    a constructor function      
*/
type T = typeof Cylinder;

/* 
  - Use declare the keyword to pretend that this function
    has been declared somewhere else to eliminate the "is 
    used before assigned error"   
*/
declare let fn: T; // fn is now the constructor function
const c = new fn(); // the instance C has a type of Cylinder

/*
   - use InstanceType generic to convert a constructor type
     to a instance type
   - basically you want to get the type of the object created
     and returned by the constructor function  
*/

type tc = InstanceType<T>; // type is Cylinder
