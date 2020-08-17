/* 
    Item 32: Prefer Unions of Interfaces to Interfaces of Unions
*/

/*
  Things to remember: 
  - Interfaces with multiple properties that are union types
    are often a mistake because they obscure the relationships
    between these properties.
  - Unions of interfaces are more precise and can be understood
    by TS.
  - Consider adding a "tag" to your structure to facilitate TS's
    control flow analysis. Because they are so well supported,
    tagged unions are ubiquitous in TS code.
 
*/

/*
  example background
  - your intention is that placeOfBirth and dateOfBirth
    both should either present or none of them present
    at the same time
*/

/*
  - a bad design: optional fields are a union of 
    their type and undefined
  - same issue here: the relationship is obscured
  - as a rule of thumb if you need to comment on 
    the relationships among fields it is usually 
    a sign of bad type design
*/
interface PersonBad {
  name: string;
  // These will either both be present or not be present
  placeOfBirth?: string;
  dateOfBirth?: Date;
}

/*
  - a better design: move null values to the perimeter (item 31) 
*/

interface Person2 {
  name: string;
  birth?: {
    place: string;
    date: Date;
  };
}

// you also facilitate single check
function checkBirthInfo(p: Person2) {
  console.log(p.name);
  const { birth } = p;
  if (birth) {
    // a single check on the birth object instead
    console.log(`was born on ${birth.date} in ${birth.place}.`);
  }
}

/*
  - if you don't have access to the PersonBad type
    and therefore can't change it
  - you can use union of interfaces
*/

// imagine you receive this value from an API
const somePerson: PersonBad = {
  name: "John",
  dateOfBirth: new Date("2000-01-01"),
  placeOfBirth: "unknown",
};

// append a number to avoid naming conflicts
interface Name_32 {
  name: string;
}

interface PersonWithBirth extends Name_32 {
  placeOfBirth: string;
  dateOfBirth: Date;
}

type Person3 = Name_32 | PersonWithBirth;

// define a function that accepts a value
// of type Person3
function checkBirthInfo2(p: Person3) {
  console.log(p.name);
  if ("placeOfBirth" in p) {
    p; // type is PersonWithBirth
    const { dateOfBirth } = p;
    dateOfBirth; // type is Date
  }
}

// pass in the value you received from the API
checkBirthInfo2(somePerson);
