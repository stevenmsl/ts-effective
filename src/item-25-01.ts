/* 
    Item 25: Use async Functions Instead of Callbacks for 
             Asynchronous Code
    
*/

/*
  Things to remember: 
  - Prefer Promises to callbacks for better composability and
    type flow.
  - Prefer async and await to raw Promises. They produce more
    concise, straightforward code and eliminate whole classes
    of errors.
  - If a function returns a Promise, declare it async
*/

/*
    - classic JS modeled asynchronous behavior
      using callbacks
    - caused pyramid of doom
    - the execution order is the opposite
      of the ode order
    - code is hard to read
    - more confusing if you want to run the
      requests in parallel or bail when an 
      error occurs
*/

declare let url1: RequestInfo;
declare let url2: RequestInfo;
declare let url3: RequestInfo;

function fetchURL(url: RequestInfo, callback: (response: string) => void) {
  setTimeout(() => {
    let res = "some results";
    callback(res);
  }, 100);
}

fetchURL(url1, function (response1) {
  fetchURL(url2, function (response2) {
    fetchURL(url3, function (response3) {
      console.log(1); // will execute fourth
    });
    console.log(2); // will execute third
  });
  console.log(3); // will execute second
});
console.log(4); // will execute first

/*
  - Promise (or called futures)
  - less nesting
  - the execution order more directly matches the
    code order.
  - easier to consolidate error handling and use 
    higher-order tools like Promise.all
*/

const page1Promise = fetch(url1);

page1Promise
  .then((response1) => {
    return fetch(url2);
  })
  .then((response2) => {
    return fetch(url3);
  })
  .then((response3) => {})
  .catch((error) => {});

/*
  - async and await (ES2017)
  - await keyword pauses execution until Promise resolves 
  - awaiting a Promise that rejects will throw an execption;
    this lets you use the try/catch machinery  
*/

async function fetchPages() {
  try {
    // await keyword pauses execution
    // until Promise resolves
    const response1 = await fetch(url1);
    const response2 = await fetch(url2);
    const response3 = await fetch(url3);
  } catch (e) {}
}

/*
  - Promises are easier to compose than callbacks
  - Types are able to flow through Promises more 
    easily than callbacks
*/

/*
  - Promise.all 
  - destructuring and await work nicely together
    in this example
*/

async function fetchPages2() {
  // TS is able to infer the types for all responses
  const [response1, response2, response3] = await Promise.all([
    fetch(url1),
    fetch(url2),
    fetch(url3),
  ]);
}

/*
  - Promise.race    
  - this is the case where you use raw Promises 
    over async/await
  - happens when you need to wrap a callback
    API like setTimeout
*/

// a promise that will never be resolved
function timeout(millis: number): Promise<never> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("timeout"), millis);
  });
}

// - the return type is simplified from
//   Promise<Response|never> to Promise<Response>
// - remember never is the empty set
async function fetchWithTimeout(url: string, ms: number) {
  return Promise.race([fetch(url), timeout(ms)]);
}
