/* 
    Item 37: Consider "Brands" for Nominal Typing
*/

/*
  Things to remember: 
  - TS uses structural typing, which can sometimes lead to 
    surprising results. If you need nominal typing, consider
    attaching "brands" to your values to distinguish them.
  - In some cases you may be able to attach brands in the 
    type system, rather than at runtime. You can use this 
    technique to model properties outside of TS's type 
    system.
*/

/*
  example background
  - sometimes you prefer nominal typing over structural typing
  - in this example you want your method "calculateNorm" to 
    only accept Vector2D values but reject Vector3D ones.   

*/

interface Vector2D {
  x: number;
  y: number;
}
function calculateNorm(p: Vector2D) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

calculateNorm({ x: 3, y: 4 }); // OK, result is 5
const vec3D = { x: 3, y: 4, z: 1 };
calculateNorm(vec3D); // OK! result is also 5

/*
  - now you want the calculateNorm method 
    only accepts Vector2D and nothing else
  - you brand Vector2D type   
*/

interface Vector2D_Branded {
  _brand: "2d"; // brand your interface
  x: number;
  y: number;
}
// provide a helper function to make it easier
// to create branded Vector2D
function vec2D(x: number, y: number): Vector2D_Branded {
  return { x, y, _brand: "2d" };
}
function calculateNorm2(p: Vector2D_Branded) {
  return Math.sqrt(p.x * p.x + p.y * p.y); // Same as before
}
calculateNorm2(vec2D(3, 4)); // OK, returns 5
const vec3D_2 = { x: 3, y: 4, z: 1 };
/* 
  - now your method only accpets values of 
      type Vector2D_Branded
  - will complain property _brand is missing
*/

//calculateNorm2(vec3D_2);
