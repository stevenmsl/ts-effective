/*
    Item 12 - Apply Types to Entire Function Expression When Possible
*/

/*
   make sure you configure the "lib" in the tsconfig.json file      
   "compilerOptions": {
        "lib": [
            "es2016",
            "dom"
        ]
    }
*/

/*
    - function statement will introduce repetitions  
    - you need to specify the types of parameters 
      and return type again and  again  
*/

function add(a: number, b: number) {
  return a + b;
}

function sub(a: number, b: number) {
  return a - b;
}

function mul(a: number, b: number) {
  return a * b;
}

function div(a: number, b: number) {
  return a / b;
}

/* 
    - define a type and apply it to function expressions     
*/

type BinaryFn = (a: number, b: number) => number;

const add2: BinaryFn = (a, b) => a + b;
const sub2: BinaryFn = (a, b) => a - b;
const mul2: BinaryFn = (a, b) => a * b;
const div2: BinaryFn = (a, b) => a / b;
/*
    - another example of a function statement, which requires you 
      to specify the types of parameters and return type individually 
    - TS will not detect if there is any deviation from your
      intention (to have the same signature as fetch function) 
*/

async function checkedFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    // - the return type of this function is Promise<Response>
    //   if you throw an error
    throw new Error("Request failed" + response.status);
  }
  return response;
}

async function checkedFetch2(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    // - the return type of this function is Promise<Response|Error>
    // - this deviates from the return type of fetch,
    //   and TS type checker will not detect it
    return new Error("Request failed" + response.status);
  }
  return response;
}

/*
    - use function expression instead
    - you can now apply the type to the entire 
      function expression
    - TS will make sure the type of the function 
      expression is the same as the fetch function
    - you will not be able to return an Error as
      TS will detect the discrepancy of the return
      type of the function          
*/

const checkedFetch3: typeof fetch = async (
  input: RequestInfo,
  init?: RequestInit
) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error("Request failed" + response.status);
  }
  return response;
};
