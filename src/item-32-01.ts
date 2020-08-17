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
  - you are building a vector drawing program
  - layout controls how and where the shapes are
    drawn
  - paint controls styles 
*/
type FillPaint = unknown;
type LinePaint = unknown;
type PointPaint = unknown;
type FillLayout = unknown;
type LineLayout = unknown;
type PointLayout = unknown;

/*
  - a bad design: interfaces of Unions
  - you can't rule out the combination of
    choosing LineLayout and FillPaint.
  - the relationships between these two 
    properties is obscured in this design.
*/

interface Layer {
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint;
}

/*
  - a better design
  - use unions of interfaces 
  - spell out the relationships to exclude the
    possibilities of mixed layout and paint 
    properties
  - use tagged unions to help TS type checker
*/

interface FillLayer {
  type: "fill";
  layout: FillLayout;
  paint: FillPaint;
}
interface LineLayer {
  type: "line";
  layout: LineLayout;
  paint: LinePaint;
}
interface PointLayer {
  type: "paint";
  layout: PointLayout;
  paint: PointPaint;
}
type Layer2 = FillLayer | LineLayer | PointLayer;

function drawLayer(layer: Layer2) {
  if (layer.type === "fill") {
    layer; // type is FillLayer
  } else if (layer.type === "line") {
    layer; // type is LineLayer
  } else {
    layer; // type is PointLayer
  }
}
