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
