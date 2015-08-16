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
