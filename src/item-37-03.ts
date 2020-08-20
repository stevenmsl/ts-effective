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
  - you want to brand built-in types such as string or number
  - you can define the type but it's not possible to 
    create any values of this type.
  - so what's the deal?
  - you are playing a game with the type system
*/
