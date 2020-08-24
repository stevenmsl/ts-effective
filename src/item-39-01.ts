/* 
    Item 39: Prefer More Precise Variants of any to Plain any
*/

/*
  Things to remember: 
  - When you use any, think about whether any JavaScript value is 
    truly permissible.
  - Prefer more precise forms of any such as any[] or {[id:strig]:any}
    or ()=> any if they more accurately model your data.
*/

/*
  don't forget any also includes null and indefined. 
   
*/

function getLengthBad(array: any) {
  // Don't do this!
  return array.length; // no type checked
}

getLengthBad(/123/); // no error will be detected

/* 
  - do this instead
  - more precise variants of any : any[] 
*/
function getLength(array: any[]) {
  return array.length; // type checked
}

// Ts can detect error: Regex not assignable to any[]
// getLength(/123/);

// in the case where you expect some sort of object
// but don't know what the values will be
function hasTwelveLetterKey(o: { [key: string]: any }) {
  for (const key in o) {
    if (key.length === 12) {
      o[key]; // you can access the value;
      return true;
    }
  }
  return false;
}

/*
  - different approach. Only difference is 
    that you can't access the value
*/
function hasTwelveLetterKey2(o: object) {
  for (const key in o) {
    if (key.length === 12) {
      // you can't access the value
      // error: Element implicitly has an 'any' type
      //        because type '{}' has no index signature
      // console.log(key, o[key]);

      return true;
    }
  }
  return false;
}

/* function type */
/* prefer these */
type Fn0 = () => any; // any function callable with no params
type Fn1 = (arg: any) => any; // With one param
type FnN = (...args: any[]) => any; // With any number of params

// don't do this
const numArgsBad = (...args: any) => args.length; // Returns any
// prefer this
const numArgsGood = (...args: any[]) => args.length; // Returns number
