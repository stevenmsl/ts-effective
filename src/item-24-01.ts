/* 
    Item 24: Be Consitent in Your Use of Aliases
    
*/

/*
  Things to remember: 
  - Aliasing can prevent TS from narrowing types. If you 
    create an alias for a variable, use it consistently.
  - Use destructuring syntax to encourage consistent naming.
  - Be aware of how function calls can invalidate type 
    refinements on properties. Trust refinements on local 
    variables more than on properties.  
*/

interface Coordinate {
  x: number;
  y: number;
}

interface BoundingBox {
  x: [number, number];
  y: [number, number];
}

interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox?: BoundingBox;
}

/*
  - why use alias? use them to avoid repetitive. 
  - we want to improve the following code 
    example using alias 
*/

function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  // we repeat polygon.bbox many times
  if (polygon.bbox) {
    if (
      pt.x < polygon.bbox.x[0] ||
      pt.x > polygon.bbox.x[1] ||
      pt.y < polygon.bbox.y[0] ||
      pt.y > polygon.bbox.y[1]
    )
      return false;
  }

  return true; // not important what you return here;
}

/*
  - first attempt
  - factor out an intermediate variable to reduce
    duplication
  - this is an example of not using the alias consistently
  - we use two names for the same thing: box and bbox
    this is a distinction without a difference       
*/

function isPointInPolygon2(polygon: Polygon, pt: Coordinate) {
  // type is BoundingBox | undefined
  // for both the alias and the property
  const box = polygon.bbox;

  // property check refines the type of the property
  // not the alias!
  if (polygon.bbox) {
    // the type of the property has been refined
    polygon.bbox; // type is BoundingBox
    box; // type is still BoundingBox|undefined
    // So you can’t really access box.x[0]
    // as it might be undefined
    // box.x[0];

    return false;
  }
}

/*
  - second attempt
  - use destructuring for consistent naming 

*/

function isPointInPolygon3(polygon: Polygon, pt: Coordinate) {
  const { bbox } = polygon; // destructuring for consistent naming
  if (bbox) {
    bbox; // type is refined to BoundinbBox
    if (
      pt.x < bbox.x[0] ||
      pt.x > bbox.x[1] ||
      pt.y < bbox.y[0] ||
      pt.y > bbox.y[1]
    )
      return false;
  }

  return true; // not important what you return here;
}

/*
  - aliasing can introduce confusion at runtime
  - the alias and the property can refer to
    different values after a function call    
*/

function calculatePolygonBbox(polygon: Polygon) {
  polygon.bbox = { x: [0, 100], y: [0, 100] };
}

declare let polygon: Polygon;
const { bbox } = polygon; // introduce an alias

if (!bbox) {
  bbox; // type is undefined
  calculatePolygonBbox(polygon); //the property has new value after the call
  // now we have a problem as bbox and polygon
  // refer to different values now
}

/*
  - on the other hand using property not alias also has
    its issues
  - after a function call the refined type might not be 
    accurate any more 
*/

// a funcion un-set the bbox property
function fn3(p: Polygon) {
  p.bbox = undefined;
}

polygon.bbox; // type is BoundingBox|undefined
if (polygon.bbox) {
  polygon.bbox; // type is refined to BoundingBox
  fn3(polygon); // polygon.bbox is set to undefined
  // type is still BoundingBox after
  // the function call which is
  // not accurate anymore
  polygon.bbox;
}
