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
  - a mix of null or non-null values can also lead to problems
    in classes
  - would lead to confusion and a proliferation of null checks
    and bugs
*/
declare function fetchUser(userId: string): Promise<UserInfo2>;
declare function fetchPostsForUser(userId: string): Promise<Post[]>;

type UserInfo2 = { name: string };
type Post = { title: string };
class UserPosts {
  user: UserInfo2 | null;
  posts: Post[] | null;
  constructor() {
    this.user = null;
    this.posts = null;
  }

  // this makes it very difficult for the
  // client to use this class.
  async init(userId: string) {
    return Promise.all([
      async () => (this.user = await fetchUser(userId)),
      async () => (this.posts = await fetchPostsForUser(userId)),
    ]);
  }

  getPostStats() {
    // it's difficult to predict when both user
    // and posts will be available
  }
}

/*
   a better design
   - wait until all the data used by the class is available
   - eliminate nullable properties
*/

class UserPosts2 {
  user: UserInfo2;
  posts: Post[];
  constructor(user: UserInfo2, posts: Post[]) {
    this.user = user;
    this.posts = posts;
  }

  static async init(userId: string): Promise<UserPosts2> {
    const [user, posts] = await Promise.all([
      fetchUser(userId),
      fetchPostsForUser(userId),
    ]);
    return new UserPosts2(user, posts);
  }

  getPostStats() {
    // now it's quite easy now
    return `${this.user.name} has ${this.posts.length} posts.`;
  }
}
