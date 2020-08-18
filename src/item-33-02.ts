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
  - you want to write a function that pulls out all the values
    for a single field in an array.
  - for example,you would like to get an array of Date[] back 
    from calling pluck(albums, 'releaseDate')
  - this is a common case of misuse of string in function parameters 
*/

// so how can we type this function?

/*
  - problematic any types
  - the type of key is too broad
*/
function pluck(record: any[], key: string): any[] {
  return record.map((r) => r[key]);
}

/*
  - first attempt
  - introduce a generic type parameter
*/

function pluck2<T>(record: T[], key: string): any[] {
  /* 
     TS will complain as the type of key is string, 
     which is too broad for the generic type T.
  */
  //return record.map((r) => r[key]);

  // basically, you achieve nothing as you
  // need to use type assertion to change
  // the type to any before accessing the property.
  return record.map((r) => (r as any)[key]);
}

/*
  - second attempt
  - use keyof to narrow the type of key
  - the return type is still too broad:
    T[keyof T][]
  - T[keyof T] is union of types of 
    properties in T.
*/

type RecordingType3 = "studio" | "live";

interface Album3 {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType3;
}

function pluck3<T>(record: T[], key: keyof T) {
  return record.map((r) => r[key]);
}

declare const albums: Album3[];
const releaseDates = pluck3(albums, "releaseDate");
/* 
   - RecordingType3 is a subset of string
   - so T[keyof T][] is (string|Date)[]
*/
releaseDates; // type is (string|Date)[] not Date[]

/*
  - third attempt
  - introduce a second generic parameter
  - K is a subset of keyof T
  - the return type is very precise now: T[K][]
*/

function pluck4<T, K extends keyof T>(record: T[], key: K): T[K][] {
  return record.map((r) => r[key]);
}

const releaseDates2 = pluck4(albums, "releaseDate");
releaseDates2; // type is Date[]
const recordingTypes = pluck4(albums, "recordingType");
recordingTypes; // type is RecordingType3[]
