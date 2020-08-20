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
  - you have a binary search function 
  - for binary search to work the list
    you are searching must be sorted
    for it to work.
  - so how can you make sure the list 
    is sorted?
*/

// well you don't know if xs is sorted
function binarySearch<T>(xs: T[], x: T): boolean {
  let low = 0,
    high = xs.length - 1;
  while (high >= low) {
    const mid = low + Math.floor((high - low) / 2);
    const v = xs[mid];
    if (v === x) return true;
    [low, high] = x > v ? [mid + 1, high] : [low, mid - 1];
  }
  return false;
}

/*
  - introduce a new branded type
  - and a helper function to help TS to 
    infer the type

*/

type SortedList<T> = T[] & { _brand: "sorted" };

function isSorted<T>(xs: T[]): xs is SortedList<T> {
  for (let i = 1; i < xs.length; i++) {
    if (xs[i] > xs[i - 1]) {
      return false;
    }
  }
  return true;
}

function binarySearch2<T>(xs: SortedList<T>, x: T): boolean {
  let low = 0,
    high = xs.length - 1;
  while (high >= low) {
    const mid = low + Math.floor((high - low) / 2);
    const v = xs[mid];
    if (v === x) return true;
    [low, high] = x > v ? [mid + 1, high] : [low, mid - 1];
  }
  return false;
}

function mySearch<T>(xs: T[], x: T): boolean {
  if (isSorted(xs)) {
    xs; // type is SortedList<T>
    return binarySearch2(xs, x);
  } else {
    // you can't call binarySearch2
    xs; // as the type is T[]
    return false;
  }
}
