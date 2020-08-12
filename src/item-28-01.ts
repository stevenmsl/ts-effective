/* 
    Item 28: Prefer Types That Always Represent Valid States
*/

/*
  Things to remember: 
  - Types that represent both valid and invalid states are
    likely to lead to confusing and error-prone code. 
  - Prefer types that only represent valid states. Even if
    they are longer or harder to express, they will save you
    time and pain in the end!
*/

/*
  - background: building a web application that lets you select
    a page, loads the content of that page, and then display
    it
  - you want to manage the state 
*/

/*
  - the following is a terrible design
  - The state can be both in error and isLoading given
    the design, which forces you to make decisions in 
    the code that doesn't seem right and most likely
    you will forget to set the state properly.
*/

interface PageState {
  pageText: string;
  isLoading: boolean;
  error?: string;
}

// no matter how you code it you won't
// be able to cover all the cases needed
function renderPage(state: PageState) {
  // it's possible that there is an error
  // and isLoading is also true - a result
  // of bad type design
  if (state.error) {
    // people might question you why show the
    // error message first not the loading
    // message?
    return "Error...";
  } else if (state.isLoading) {
    return "Loading...";
  } else return `<h1>${state.pageText} </h1>`;
}

// this is even worse
async function changePage(state: PageState, newPage: string) {
  /* 
     - we didn't clear out the error to deal with scenarios 
       that the previous request might be failed
     - this happens all the time for the simple reason that 
       I am loading a page why I am responsible for clearing 
       out errors caused by someone else? 
  */
  state.isLoading = true;
  try {
    const response = await fetch(newPage);
    if (!response.ok) {
      throw new Error("...");
    }
    const text = await response.text();
    /*
      - if the user changes pages while
        the page is loading we have 
        a race condition
      - different async operations will 
        all try to update the same pageText
        state
      - the result will be a chaos as you
        don't know which page will be displayed
        as it depends what the pageText is 
        at the time of rendering
    */
    state.isLoading = false;
    state.pageText = text;
  } catch (e) {
    /*
      - we forgot to set isLoading to false as
        we just want to report an error occured!
      - bad type design forces you to do extras 
        that oftentimes you will forget to do
    */
    state.error = "" + e;
  }
}

/*
  conclusion:
  - the state design includes too much info: both error and isLoading
  - the state design includes too little info: you need to track
    the state of individual pages to avoid race condition   
*/

/*
  solution:
  - use tagged union (discriminated union) to explicitly 
    model the different states that a network request 
    can be in.
  - doesn't admit invalid states
  - model current page explicitly 
  - model the state of every request issued so each
    request is in exactly one state at any given time
*/

interface RequestPending {
  state: "pending";
}
interface RequestError {
  state: "error";
  error: string;
}
interface RequestSuccess {
  state: "ok";
  pageText: string;
}
type RequestState = RequestPending | RequestError | RequestSuccess;

interface PagesState {
  currentPage: string;
  requests: { [page: string]: RequestState };
}

/*
  - now both functions are easy to implement
*/

function renderPage2(state: PagesState) {
  const { currentPage } = state;
  /* 
    - we also model the current page
      so the user can change pages 
      and we just retrieve the state
      associated with the requested
      page
    - you will not be showing the content of 
      page1 while asking for page2 as the
      state is managed separately for each page.
  */
  const requestState = state.requests[currentPage];

  /*
     - no more ambiguity here as
       you no longer admit invalid states 
     - you will not in a state where you have
       an error and isLoading is true
  */

  switch (requestState.state) {
    case "pending":
      return "loading...";
    case "error":
      return "Error...";
    case "ok":
      return `<h1>${requestState.pageText}</h1>`;
  }
}

async function changePage2(state: PagesState, newPage: string) {
  // you don't need to remember to
  // clear out any error any more
  state.requests[newPage] = { state: "pending" };
  state.currentPage = newPage;
  try {
    const response = await fetch(newPage);
    if (!response.ok) {
      throw new Error("Error...");
    }
    const pageText = await response.text();

    /* 
       - you also solve the race condition.
       - if the user changes page while this
         page is still being loaded that is fine.
       - I still can continue loading the old page
         and update the state for this request when
         it's done.
       - the result just won't affect the UI as the
         user has changed page   
    */

    state.requests[newPage] = { state: "ok", pageText };
  } catch (e) {
    // you just report the error
    // no longer need to worry
    // about set isLoading to false
    state.requests[newPage] = { state: "error", error: "" + e };
  }
}
