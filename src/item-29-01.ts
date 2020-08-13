/* 
    Item 29: Be Liberal in What You Accept and Strict in 
             What You Produce
*/

/*
  Things to remember: 
  - Input types tend to be broader than output types. 
    Optional properties and union types are more common
    in parameter types than return types.
  - To reuse types between parameters and return types,
    introduce a canonical form (for return types) and 
    a looser form (for parameter types). 
*/

/*
  - in this design both parameter types and return types
    are the same, and the types are quite liberal
  - that means the return type is too broad, and as a result
    it's more difficult for the client to use the functions
*/

declare function setCamera(camera: CameraOptions): void;
// - the interface CameraOptions consists of only optional
//   fields, which makes it very liberal
// - however this also makes it very difficult for the clinet
//   to use functions who use this as a return type
declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;
declare function calculateBoundingBox(f: Feature): LngLatBounds;

interface CameraOptions {
  center?: LngLat;
  zoom?: number;
  bearing?: number;
  pitch?: number;
}
type LngLat =
  | { lng: number; lat: number }
  | { lon: number; lat: number }
  | [number, number];

type LngLatBounds =
  | { northeast: LngLat; southwest: LngLat }
  | [LngLat, LngLat]
  | [number, number, number, number];

type Feature = { name: string };

/*
  - the following function demonstrates why CameraOptions 
    is difficult to use as a return type
  - broad parameter type is convenient; broad return type
    is not
*/

function focusOnFeature(f: Feature) {
  const bounds = calculateBoundingBox(f);
  const camera = viewportForBounds(bounds);
  setCamera(camera);
  /* 
    - you can't do the following as the type of
      the center property is too broad
    - const { center: {lat, lng}, zoom} = camera;
  */

  // you can only do this
  const { center, zoom } = camera;
  /*
   - this is just to consume one property center
   - there is already a lot of work as you need to
     introduce a code branch for each component of
     the union type
  */
  center; // type is union type
  if (center !== undefined) {
    if ("lng" in center) {
      center; // type narrows to { lng: number; lat: number }
    } else if ("lon" in center) {
      center; // type narrows to  { lon: number; lat: number }
    }
  }

  zoom; // type is number|undefined
  // now you have to introduce code branch again...
}

/*
  so what is the solution?
  - introduce a canonical form (for return types) and 
    a looser form (for parameter types).
*/

/*
 - canonical form (for return types)
*/
interface LngLat2 {
  lng: number;
  lat: number;
}
interface Camera {
  center: LngLat2;
  zoom: number;
  bearing: number;
  pitch: number;
}

/*
 - looser form (for parameter types)
*/
type LngLat2Like = LngLat2 | { lon: number; lat: number } | [number, number];

interface CameraOptions2 extends Omit<Partial<Camera>, "center"> {
  // swap out the center as you need a
  // broader type than LngLat2
  center?: LngLat2Like;
}

type LngLatBounds2 =
  | { northeast: LngLat2Like; southwest: LngLat2Like }
  | [LngLat2Like, LngLat2Like]
  | [number, number, number, number];

declare function setCamera2(camera: Camera): void;
declare function viewportForBounds2(bounds: LngLatBounds2): Camera;
declare function calculateBoundingBox2(f: Feature): LngLatBounds2;

function focusOnFeature2(f: Feature) {
  const bounds = calculateBoundingBox2(f);
  const camera = viewportForBounds2(bounds);
  setCamera(camera);

  const { center, zoom } = camera;
  // now the properties are much easier to work with
  center; // type is LngLat2
  zoom; // type is number
}
