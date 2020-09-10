/* 
    Item 56: Don't Rely on Private to Hide Information   
             
*/

/*
  Things to remember: 
  - The private access modifier is only enforced through
    the type system. It has no effect at runtime and can
    be by passed with an assertion. Don't assume it will
    keep data hidden.
  - For more reliable information hiding, use a closure.
*/

class Diary {
  // private will go away at runtime
  private secret = "cheated on my English test";
}

const diary = new Diary();
// looks you can't access secret
// diary.secret;
//       ~~~~~~ Property 'secret' is private and only
//              accessible within class 'Diary'

// but actually you can - with type assertion

(diary as any).secret; // OK

declare function hash(text: string): number;

/* use closure */
class PasswordChecker {
  checkPassword: (password: string) => boolean;
  // no one has access to passwordHash
  // from outside the constructor
  constructor(passwordHash: number) {
    /* 
     the downside
     - every method that need to access passwordHash
       needs to be defined inside the constructor
     - a copy of such methods will be created for 
       each class instance, which will lead to higher
       memory use.
    */
    this.checkPassword = (password: string) => {
      return hash(password) === passwordHash;
    };
  }
}

const checker = new PasswordChecker(hash("s3cret"));
checker.checkPassword("s3cret"); // Returns true

/* 
  private fields
*/

/*  make sure you set the target properly
    "compilerOptions": {
        "target": "es2015"
    }
*/

class PasswordChecker2 {
  #password: number;
  checkPassword(password: string) {
    return hash(password) === this.#password;
  }

  constructor(passwordHash: number) {
    this.#password = passwordHash;
  }
}

const checker2 = new PasswordChecker2(hash("s3cret"));
checker2.checkPassword("s3cret"); // Returns true
