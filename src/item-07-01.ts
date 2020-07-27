/*
    Item 7 - Think of Types as Sets of Values
*/

interface Person {
  name: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}

/*
  - Intersecting two types will create a new type 
    that contains the union of properties in each 
    of its constituents. 
  - PersonSpan (intersected type) needs to have the 
    properties to satisfy the requirement of both 
    Person and Lifespan at the same time. 
*/
type PersonSpan = Person & Lifespan; // Intersection
type PersonSpanKeys = keyof PersonSpan; // "name"|"birth"|"death"

/*
  - keyof (Person & Lifespan) = (keyof Person) | (keyof Lifespan) 
  - literal types union, use | operator not &   – don’t confuse 
    this with type intersection, in which the resulting type 
    will have the properties from both types being intersected.
  - think of literal types union as a normal set union operation 
    which combines two sets of values into one, bigger set.    
*/
type PersonSpanKeys2 = keyof Person | keyof Lifespan; // "name"|"birth"|"death"

const ps: PersonSpan = {
  name: "",
  birth: new Date("1900-01-01"),
  death: undefined,
};

/*

*/
type PersonOrLifespan = Person | Lifespan;

//  ps2 is of type Person
const ps2: PersonOrLifespan = {
  name: "",
};

// ps3 is of type Lifespan
const ps3: PersonOrLifespan = {
  birth: new Date("1900-01-01"),
};

const ps4: PersonOrLifespan = {
  name: "",
  birth: new Date("1900-01-01"),
};

/*
    - You can’t assign ps4 to ps5 even though p4 
      has all the properties to be considered as 
      a PersonSpan
    - the reason for that is that ps4 can be a 
      Person or Lifespan from the type perspective. 
      It might not have a birth property when it 
      is a Person, in which case it can not be 
      considered a PersonSpan type.    
*/

// const ps5: PersonSpan = ps4;

/*
  - ps3 does not have the name property but 
    TS won’t report an error here
  - be discreet when use ‘as’ to cast the type 
*/
const ps6: PersonSpan = ps3 as PersonSpan;

/* 
  - TS cannot guarantee what the keys would look like in union types
    hence it would just return you the type never, ff there are no 
    common properties among types used to create the union type  
    which represents an empty set, 
  - in the case of PersonOrLifespan, you can have just one property: 
    name, or two properties name and birth, or again just one 
    property birth. They are all legit cases for PersonOrLifespan
    types.
*/
type PersonOrLifespanKeys = keyof PersonOrLifespan; // never
type PersonOfLifespanKeys2 = keyof Person & keyof Lifespan;

interface Animal {
  name: string;
  domesticated: boolean;
}

type PersonOrAnimal = Animal | Person;

/*
  - regardless what the value’s type is, 
    Animal or Person, it will definitely
    have the name property 
*/
type PersonOrAnimalKeys = keyof PersonOrAnimal; // "name"
