/* 
    Item 33: Prefer More Precise Alternatives to String Types
*/

/*
  Things to remember: 
  - Avoid "stringly typed" code. Prefer more appropriate types
    where not every string is a possibility.
  - Prefer a union of string literal types to string if that
    more accurately describes the domain of a variable. You'll
    get stricter type checking and improve the development
    experience.
  - Prefer keyof T to string for function parameters that are 
    expected to be properties of an object.
*/

/*
  example background
  - you are building a music collection and want to define 
    a type for an album
*/

/*
 - a bad design
 - prevalence of string types and the type information
   in comments
*/

interface Album {
  artist: string;
  title: string;
  releaseDate: string; // YYYY-MM-DD
  recordingType: string; // E.g., "live" or "studio"
}

// TS won't be able to detect the problems for you
const kindOfBlue: Album = {
  artist: "Miles Davis",
  title: "Kind of Blue",
  releaseDate: "August 17th, 1959", // Oops!
  recordingType: "Studio", // Oops! should be studio all lowercase
}; // OK

function recordRelease(title: string, date: string) {
  /* ... */
}

// parameters are reversed ,but TS can't warn you anything
recordRelease(kindOfBlue.releaseDate, kindOfBlue.title);

/*
  - a better design
    
*/

// you can attach documentation to the type - mouse
// over the type and will see the documentation appear

/** What type of environment was this recording made in?  */
type RecordingType = "studio" | "live";

interface Album2 {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType;
}

// you can't reverse the parameters now
function recordRelease2(title: string, date: Date) {
  /* ... */
}
