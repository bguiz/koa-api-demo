# `koa-api-demo`

## Steps

- [x] Initialise -
  [tag](https://github.com/bguiz/koa-api-demo/tree/v0.0.1)
  - Create `package.json` using `npm init`
  - `npm install --save` dependencies needed by the server
  - `npm install --save-dev` dependencies used in development and testing
  - Create `npm run *` scripts:
    - `start` to run the server
    - `lint` to verify syntax
    - `test` to do tests
    - `cover` to do code coverage
    - The are all done pre-emptively, not used yet,
      since we have written neither the application code nor test cases
- [x] Test -
  [tag](https://github.com/bguiz/koa-api-demo/tree/v0.0.2)
  [diff](https://github.com/bguiz/koa-api-demo/compare/v0.0.1...v0.0.2)
  - Create `lib/server.js`
    - Use `koa` to run a HTTP server
    - However
  - Create `test/00-hello.spec.js`
    - `describe()` and `it()` from `mocha` to group and define test cases
    - use `co()` to enable running tests using `yield`
      - Ensure that done is always called by using this pattern:
        `co(function *() { /* ... */ }).then(done, done);`
    - Tests do not actually need to run over HTTP,
      simply interact with the `koa` instance directly
      (just like in `express`)
    - Use `supertest-as-promised` for *promisified*,
      and therefore *`yield`-able* in tests
    - Run `npm run test`
      - Executes `packageJson.scripts.test`
        - `node --harmony ./node_modules/mocha/bin/_mocha -u bdd -R spec`
      - Tests will fail, of course, because we have not written
        any code on the server for this endpoint!
          - Output:
            ```bash
              Error: expected { hello: 'world!' } response body, got {}
              + expected - actual

              -{}
              +{
              +  "hello": "world!"
              +}
            ```
      - We are writing tests first, and then doing the implementation next
- [x] Server -
  [tag](https://github.com/bguiz/koa-api-demo/tree/v0.0.3)
  [diff](https://github.com/bguiz/koa-api-demo/compare/v0.0.2...v0.0.3)
  - Update `lib/server.js`
    - Use `koa-router` to define routes at `/api/v1/hello`
    - Define a generator function for `koa` to serve a HTTP `GET` at this URL
    - Response is a simple hard coded JSON object, and sets the status to `200` (OK)
    - Visit `http://localhost:4200/api/v1/hello` to see the response in your browser
  - Execute `npm run test`, and this time the test that was failing earlier starts to pass
  - Congratulations, we now have a HTTP server!
    - that serves JSON responses
    - uses generator functions
- [x] Lint -
  [tag](https://github.com/bguiz/koa-api-demo/tree/v0.0.4)
  [diff](https://github.com/bguiz/koa-api-demo/compare/v0.0.3...v0.0.4)
  - Run `eslint` from the command line using `npm run lint`
    - Executes `packageJson.scripts.lint`
      - `./node_modules/.bin/eslint lib`
      - Uses configuration in `.eslintrc`
        - Take a look at this files contents
        - Configure it to your liking
          - [How to configure `eslint`](http://eslint.org/docs/user-guide/configuring.html)
          - [The available `eslint` rules](http://eslint.org/docs/rules/)
      - The lint task should exit with no errors
    - Edit `lib/server.js` and remove a semicolon at random
      - Run the lint task again, notice that a test failure occurs:
        ```bash
          lib/server.js
            4:19  error  Missing semicolon  semi

          ✖ 1 problem (1 error, 0 warnings)
        ```
      - Undo the edit, replacing the lost semicolon
      - Run the lint task yet again, and we are back to no errors
  - Be sure to run the `lint` task every now and then on your code
    - Ensures that your code style is consistent
      across different parts of your code
    - This is doubly important across any project that is
      large, complex, or involves more than one developer
    - A good way to nip nasty bugs in the bud
      (i.e. before they even become bugs)
- [x] Cover -
  [tag](https://github.com/bguiz/koa-api-demo/tree/v0.0.5)
  [diff](https://github.com/bguiz/koa-api-demo/compare/v0.0.4...v0.0.5)
  - Run `istanbul` from the command line using `npm run cover`
    - Executes `packageJson.scripts.lint`
      - `./node_modules/.bin/babel-node ./node_modules/.bin/isparta cover ./node_modules/mocha/bin/_mocha`
    - `istanbul` on its own will not work,
      because it does not understand ES6 syntax;
      this is where `babel` and `isparta` come into play
    - View the code coverage report
      - There will be an overview report output to the terminal:
          ```bash
          =============================== Coverage summary ===============================
          Statements   : 100% ( 18/18 )
          Branches     : 100% ( 3/3 )
          Functions    : 100% ( 2/2 )
          Lines        : 100% ( 14/14 )
          ================================================================================
          ```
      - There will also be a JSON and LCOV reports,
        which is useful to export to external tools,
        such as a continuous integration/ deployment tool
        - `less coverage/coverage.json`
        - `less coverage/lcov.info `
      - There will also be a HTML report, which is useful for you to look at in detail
        - `firefox firefox coverage/lcov-report/index.html`
        - `firefox coverage/lcov-report/lib/server.js.html`
  - Code coverage essentially works by doing three things in sequence
    1. **Instrument** the code
      (place little markers in every line of code, statement, function, and branch)
    2. **Execute tests** using the test runner, in this case `mocha`
      (same one we have used in `npm run test`)
    3. **Build the report** as the tests execute,
      the little markers placed in the code during instrumentation
      track which bit have of code have been executed (and how often).
      From this, the code coverage tool can deduce
      which parts **have**, and have **not** been executed,
      and a report is created
  - Reduce the code coverage (intentionally) to see it action
    - Edit `lib/server.js`
      - Insert some redundant code into `getHelloWorld()`:
          ```javascript
          if (false) {
            (function() {
              console.log('This statement never gets reached');
            })();
          }
          ```
      - Now run the `cover` task again, and observe that our
        all-round 100 percent code coverage drop drop to 80-ish percent:
          ```bash
          =============================== Coverage summary ===============================
          Statements   : 90.48% ( 19/21 )
          Branches     : 80% ( 4/5 )
          Functions    : 66.67% ( 2/3 )
          Lines        : 88.24% ( 15/17 )
          ================================================================================
          ```
      - Undo the edit to `lib/server.js` to remove the redundant code,
        and run the `cover` task again;
        and observe that we restore our code coverage to an all-round 100 percent again.
  - Be sure to run the `cover` task every now and then on your code
    - Ensures two things:
      1. That the code that you have written is indeed being executed
        - Code that is not executed at all is dead code,
          and is an indicator of problems in your code base;
        - Usually it either needs to be deleted,
          or there is a bug somewhere else in the code
          where it is supposed to be getting called from
      1. That the tests that you have written do indeed test all of your code
        - Coverage is both about code coverage and test coverage
        - If some code is not getting execute,
          it could be simply because that there is not test case that reaches
          that particular statement, branch, or function
        - Usually this means that you need to think of additional test cases
          in order to more thoroughly test your code
    - Aim for a code coverage of as close to 100 percent as is reasonably possible
      (as projects get larger, and more complex, 100 percent is extremely hard to achieve)
