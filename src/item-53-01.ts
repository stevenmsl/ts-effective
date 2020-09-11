/* 
    Item 53: Prefer ECMAScript Features to TypeScript Features   
             
*/

/*
  Enums - number-valued Enums      
*/

enum Flavor {
  VANILLA = 0,
  CHOCOLATE = 1,
  STRAWBERRY = 2,
}

let flavor = Flavor.CHOCOLATE; // Type is Flavor

Flavor; // Autocomplete shows: VANILLA, CHOCOLATE, STRAWBERRY
Flavor[0]; // Value is "VANILLA"

/*  
  - any number is assignable to flavor
  - it's not very safe
  - JS code will be generated to represent
    the enum:
    var Flavor;
    (function (Flavor) {
      Flavor[Flavor["VANILLA"] = 0] = "VANILLA";
      Flavor[Flavor["CHOCOLATE"] = 1] = "CHOCOLATE";
      Flavor[Flavor["STRAWBERRY"] = 2] = "STRAWBERRY";
    })(Flavor || (Flavor = {}));
    
*/

flavor = 3;

/*
  - when you use 'const enum' no JS code 
    will be generated to represent 
    the enum type as opposed to
    'enum'.
  
  - you can't do this anymore: Flavor2[0]
    as no object(array) will be created to represent
    Flavor2     
*/

const enum Flavor2 {
  VANILLA = 0,
  CHOCOLATE = 1,
  STRAWBERRY = 2,
}

let flavor2 = Flavor2.STRAWBERRY;

// you can't do this anymore
// Flavor2[0];

/*
  it will compile to 
  2; 
  in JS
*/
Flavor2["STRAWBERRY"];

flavor2 = 5; // still not safe

/*
  Enums - string-valued Enums      
*/

enum Flavor3 {
  VANILLA = "vanilla",
  CHOCOLATE = "chocolate",
  STRAWBERRY = "strawberry",
}

/*
  - generated JS code for the enum Flavor3

    var Flavor3;
    (function (Flavor3) {
    Flavor3["VANILLA"] = "vanilla";
    Flavor3["CHOCOLATE"] = "chocolate";
    Flavor3["STRAWBERRY"] = "strawberry";
    })(Flavor3 || (Flavor3 = {}));
*/

let flavor3 = Flavor3.CHOCOLATE; // Type is Flavor

/*
  - you can't assign a string to flavor3
  - it does provide safety, but is this a good thing? 
*/
/*
  flavor3 = "strawberry";
            // ~~~~~~ Type '"strawberry"' is not assignable to type 'Flavor'
*/

/*
  - not really a good thing if you are creating a lib  
  - you create divergent experinces for JS and TS users 
*/

function scoop(flavor: Flavor3) {}

// as TS user I can't pass in a string to this function

/*
   scoop("vanilla"); 
        //'vanilla' is not assignable to ....
*/

// but as JS user I can as the generated code is like this
/*
  function scoop(flavor) {
    
  }
  scoop("vanilla"); // ok
*/

/*
  use union types instead
*/

// Flavor5 is wiped out in JS
type Flavor5 = "vanilla" | "chocolate" | "strawberry";
let flavor5: Flavor5 = "chocolate";

function scoop2(flavor: Flavor5) {}
scoop2("vanilla"); //ok

/*
  - generated JS
    function scoop2(flavor) { }
  - provides same experiences for JS users
    scoop2("vanilla"); //ok 
*/
