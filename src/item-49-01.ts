/* 
    Item 49: Provide a Type for this in Callbacks 
             
*/

/*
  Things to remember: 
  - Understand how this binding works.
  - Provide a type for this in callbacks when it's 
    part of your API.
*/

declare function makeButton(props: { text: string; onClick: () => void }): void;

/*
  - how to bind this properly
*/

class ResetButton {
  constructor() {
    // step 2:
    // this creats a property called
    // onClick on the instance of
    // ResetButton with this bound
    // to that instance
    this.onClick = this.onClick.bind(this);
  }
  render() {
    // step 3:
    // the onClick instance property comes
    // before the onClick prototype property
    // in the lookup sequence
    return makeButton({ text: "Reset", onClick: this.onClick });
  }
  // step 1:
  // this will create a property called onClick
  // on ResetButton.prototype
  onClick() {
    alert(`Reset ${this}`);
  }
}

/*
  shorthand for binding
  - use arrow function
*/

class ResetButton2 {
  render() {
    return makeButton({ text: "Reset", onClick: this.onClick });
  }
  onClick = () => {
    alert(`Reset ${this}`); // "this" always refers to the ResetButton instance.
  };
}

/*
  - how TS helps with this binding when creating
    your callbacks?
  - use this parameter
  - TS will enforce you to call the 
    function with proper binding.
*/

function addKeyListener(
  el: HTMLElement,
  fn: (this: HTMLElement, e: KeyboardEvent) => void
) {
  el.addEventListener("keydown", (e) => {
    fn.call(el, e);

    // you can't call fn with two parameters
    // fn(el, e);
    //     ~ Expected 1 arguments, but got 2

    // you can't call fn with one parameter either
    // fn(e);
    // ~~~~~ The 'this' context of type 'void' is not assignable
    //       to method's 'this' of type 'HTMLElement'
  });
}

/*
  - How TS helps from a user's perspective 
    of the callbacks 
*/

declare let el49: HTMLElement;
addKeyListener(el49, function (e) {
  this.innerHTML; // OK, "this" has type of HTMLElement
});

/*
  - TS will detect the error    
*/
class Foo {
  registerHandler(el: HTMLElement) {
    // you pass in an arrow function
    // which override the value of this
    // HTMLElement -> Foo
    addKeyListener(el, (e) => {
      // this.innerHTML;
      // ~~~~~~~~~ Property 'innerHTML' does not exist on type 'Foo'
    });
  }
}
