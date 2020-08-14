/* 
    Item 31: Push Null Values to the Perimeter of Your Types
*/

/*
  Things to remember: 
  - Avoid designs in which one value being null or not null
    is implicitly related to another value being null or 
    not null.
  - Push null values to the perimeter of your API by making
    larger objects either null or fully non-null. This will
    make code clearer both for human readers and for the 
    type checker.
  - Consider creating a fully non-null class and constructing
    it when all values are available.
  - While strictNullChecks may flag many issues in your code,
    it's indispensable for surfacing the behavior of functions
    with respect to the null values.
*/

/*
  - extent function will find the min and max
    elements in an array
  - a problematic design
*/

function extent(nums: number[]) {
  let min, max;
  for (const num of nums) {
    /*  
      - in your mind, both min and max
        should be set at the same time -
        they are related.
      - but you just check if min has
        been set as it seems good enough
      - also there is a bug here if there
        is 0 in the array the result is 
        incorrect:
        extent([0,1,2]) will return 
        [1,2] rather than [0,2] due
        to type coercion.   
    */
    if (!min) {
      min = num;
      max = num;
    } else {
      min = Math.min(min, num);
      /*
        - now using max is a problem as in type 
          checker's mind its type is number|undefined
          instead of number
        - so you can't calculate the max
          using Math.max as it expects
          both parameters has a type of number 
      */
      // can't do this
      // max = Math.max(max, num);
    }
  }

  /* 
    - if you pass in an empty array both min and
      max will be undefined so the return type
      is (number | undefined)[]
    - this also makes you function difficult to use
  */
  return [min, max];
}

// this is why it's difficult to use
const [min, max] = extent([0, 1, 2]);

// you can't even do simple thing like this:
// const span = max - min;
// you have to do this:
if (min !== undefined && max !== undefined) {
  const span = max - min;
}

/*
  The solution:
  - put the min and max in the same object and
    make this object either fully null or fully
    non-null  
*/

function extent2(nums: number[]) {
  // you are telling type checker that
  // either the result is null or it
  // must have both min and max values
  let result: [number, number] | null = null;
  for (const num of nums) {
    // the bug is fixed as you are checking an object now
    if (!result) {
      result = [num, num];
    } else {
      result = [Math.min(num, result[0]), Math.max(num, result[1])];
    }
  }
  return result;
}

/*
  - now the extent2 function is much easier to use
    comparing to extent function    
*/

// put this in a block to avoid collisions
{
  // you can now use non-null assertion to
  // narrow the types
  const [min, max] = extent2([0, 1, 2])!;
  const span = max - min;

  /*
    side note on non-null assertion:
    you use it in cases where you are pretty sure 
    the values can't be null like the case above.  
  */

  // or a single check
  const range = extent2([0, 1, 2]);
  if (range) {
    const [min, max] = range;
    const span = max - min;
  }
}
