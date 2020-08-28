/* 
    Item 42: Prefer Type-Safe Approaches to Monkey Patching
             
*/

/*
  Things to remember: 
  - Prefer structured code to storing data in globals or
    on the DOM.
  - If you must store data on built-in types, use one of 
    the type-safe approaches (augmentation or asserting
    a custom interface).
  - Understand the scoping issues of augmentations.
*/

/*
  - unlike JS, TS will not allow you to attach data to 
    window or a DOM node.       
*/

/*
document.monkey = 'Tamarin';
      // ~~~~~~ Property 'monkey' does not exist on type 'Document'
*/

/*
  - attaching data to window or a DOM node is generally not good
    designs: you introduce global variables
  - if you have to do this, use an augmentation 
  - this approach allows you to attach the documentation to 
    the property
*/

/*
  downsides 
  - the augmentation still applies globally
  - this is problematic if the data is patched
    to HTML elements and you assign the property
    at runtime. This is because some elements
    might not have this property set. So the 
    type probably should be string|undefined
    instead of just string 
*/

/*
interface Document {
  monkey: string;
}

document.monkey = "Tamarin"; // OK
*/

/*
  better approach
  - use a more precise type assertion
  - you won't have access to the monkey
    property unless you import the 
    MonkeyDocument interface
  - you have to write an assertion, which
    would remind you that better refactor
    the code later as this pathching data 
    approach is not a good design 
*/

interface MonkeyDocument extends Document {
  /** Genus or species of monkey patch */
  monkey: string;
}

(document as MonkeyDocument).monkey = "Macaque";
