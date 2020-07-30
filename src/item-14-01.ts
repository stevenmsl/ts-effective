/* 
    Item 14: Use Type Operations and Generics to Avoid Repeating Yourself    
*/

/*
   - in code you factor out a constant instead of writing
     it repeatedly
   - in type you name your type to achieve the same effect   
*/

// instead of
function distance(a: { x: number; y: number }, b: { x: number; y: number }) {}
// do this - name your type
interface Point2D {
  x: number;
  y: number;
}
function distance2(a: Point2D, b: Point2D) {}

/* 
  - several functions share the same type signature  
*/

interface HttpOptions {}

// instead of

function get(url: string, opts: HttpOptions): string {
  return "done";
}
function post(url: string, opts: HttpOptions): string {
  return "done";
}

// do this - factor out a named type for the signature
type HTTPFunction = (url: string, opts: HttpOptions) => string;
const get2: HTTPFunction = (url, opts) => {
  return "done";
};
const post2: HTTPFunction = (url, opts) => {
  return "done";
};

/*
  - when extending a type looks unnatural to you 
  - State represents the state of the entire application
  - TopNavState just represents part of the state
  - is State extending TopNavState looks natural to you?
  - You want to define TopNavState as a subset of the fields
    in State   
*/

interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}

// Instead of repeating yourself
interface TopNavState {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
}

// Do this - define a type by indexing into State

// this Will produce a type exactly the same
// structure as the interface TopNavState
type TopNavState2 = {
  [k in "userId" | "pageTitle" | "recentFiles"]: State[k];
};

// Or you can use Pick from the standard library
// Pick takes two types and return a third - just
// like a function take two values and return a third
type TopNavState3 = Pick<State, "userId" | "pageTitle" | "recentFiles">;

/*
  - tagged unions
  - one example I can think of is the 
    actions and reducers in Redux 
*/

interface SaveAction {
  type: "save";
}

interface LoadAction {
  type: "load";
}

type Action = SaveAction | LoadAction;

// instead of typing this out
// and maintain it manually
type ActionType = "save" | "load";

// do this - index into the Action union
type ActionType2 = Action["type"]; // "save" | "load"

/*
   - a class that can be initialized and later updated
   - update has almost the same parameters as 
     the constructor other than they are optional
   - use a mapped type and keyof to avoid repeating yourself    
*/

interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}

// instead of repeating yourself
interface OptionsUpdate {
  width?: number;
  height?: number;
  color?: string;
  label?: string;
}
class UIWidget {
  constructor(init: Options) {}
  update(options: OptionsUpdate) {}
}

// do this - use a mapped type and keyof
// keyof will return a union type: "width"|"height"|"color"|"label"
// ? makes each property optional
type OptionsUpdate2 = { [k in keyof Options]?: Options[k] };
class UIWidget2 {
  constructor(init: Options) {}
  update(options: OptionsUpdate2) {}
}

/*
  - you find yourself wanting to define a type matches
    the shape of a value; maybe a constant defined 
    in a third-party package 
*/
const INIT_OPTIONS = {
  width: 640,
  height: 480,
  color: "#00FF00",
  label: "VGA",
};

// instead of
interface ViewOptions {
  width: number;
  height: number;
  color: string;
  label: string;
}

// do this - don't typeof only operates on values
type ViewOptions2 = typeof INIT_OPTIONS;

/*
  - you want to create a named type for the 
    inferred return value of a function or 
    method 
*/

function getUserInfo(userId: string) {
  const name = "";
  const age = 100;
  const height = 180;
  const weight = 70;
  const favoriteColor = "Blue";
  return { userId, name, age, height, weight, favoriteColor };
}

// function type: the signature of the function
type functionType = typeof getUserInfo;

// the return type of the function
type UserInfo = ReturnType<functionType>;
