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
  - a function should either always be run synchronously or 
    always be run asynchronously.
  - a async function always returns a Promise which helps
    enforce this important rule   
*/

/*
  - what happens if you mix running the code synchronously 
    and asynchronously in the same function
  - it will be extremely difficult for a client to use
*/
function fetchURL2(url: RequestInfo, callback: (response: string) => void) {
  setTimeout(() => {
    let res = "some results";
    callback(res);
  }, 100);
}

// this is a terrible way to code your function
const _cache: { [url: string]: string } = {};
function fetchWithCache(url: string, callback: (text: string) => void) {
  if (url in _cache) {
    callback(_cache[url]); // run synchronously
  } else {
    fetchURL2(url, (text) => {
      _cache[url] = text;
      callback(text); // run asynchronously
    });
  }
}

/*
  - this fetchWithCache function is extremely 
    difficult to use
  - if the userId is in the cache the status will 
    be set to success and then set back to loading
  - if the userId is not in the cache the status will
    be set to loading and then set to success   
*/

let requestStatus: "loading" | "success" | "error";
function getUser(userId: string) {
  fetchWithCache(`user/${userId}`, (profile) => {
    requestStatus = "success";
  });
  requestStatus = "loading";
}

/*
  - use async/await to fix the problem
  - it's actually quite difficult to produce
    half-synchronous code with async, which 
    is a good thing. 
*/

// return type is Promise<string>
async function fetchWithCache2(url: string) {
  if (url in _cache) {
    return _cache[url];
  }
  const response = await fetch(url);
  const text = await response.text();
  _cache[url] = text;
  return text;
}

// the status works as expected
async function getUser2(userId: string) {
  requestStatus = "loading";
  const profile = await fetchWithCache2(`user/${userId}`);
  requestStatus = "success";
}

/*
  - another good thing with async is that if you return 
    a Promise from an async function it will not get 
    wrapped in another Promise 
*/

// return type is Promise<any> instead of
// Promise<Promise<any>>
async function getJSON(url: string) {
  const response = await fetch(url);
  const jsonPromise = response.json();
  return jsonPromise;
}
