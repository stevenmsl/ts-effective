/* 
    Item 34: Prefer Incomplete Types to Inaccurate Types
*/

/*
  Things to remember: 
  - Avoid the uncanny valley of type safety: incorrect types
    are often worse no types. 
  - If you cannot model a type accurately, do not model it 
    inaccurately! Acknowledge the gaps using any or unknown. 
  - Pay attention to error messages and autocomplete as you
    make typings increasingly precise. It's not just about
    correctness: developer experience matters, too.
*/

/*
  example background
  - you are refining types coming from outside your program
    such as APIs (GeoJSON) .
  - however you are generating the types from data meaning 
    you are only considering the examples you've seen.
  - this is bad as you break other people's code as they
    need to use the API in the cases you have not considered.
*/

/* beore you refine the types */

interface Point2 {
  type: "Point";
  coordinates: number[];
}
interface LineString2 {
  type: "LineString";
  coordinates: number[][];
}
interface Polygon2 {
  type: "Polygon";
  coordinates: number[][][];
}
type Geometry = Point2 | LineString2 | Polygon2; // Also several others

/* 
  - you then refine the types so it can only take 
    two numbers for a coordinate.
  - the problem is that GeoJSON actually allows
    a third element in a coordinate. But you never
    use it hence aren't aware of it.
  - you break other people's code as now they 
    can't provide a third element in a coordinate
    anymore.
  - you are defining inaccurate types
*/

// oops! can't take a third element anymore
type GeoPosition = [number, number]; // inaccurate type
interface Point3 {
  type: "Point";
  coordinates: GeoPosition;
}
