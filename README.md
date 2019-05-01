# micro-template

### Core concepts

If the web application accepts the request and returns the response, it is reasonable to express it with a function.
Indeed, applications are arbitrarily complex. But they accept the request and return the response, so at the abstract level, it is a function.

A router is also a function that accepts a request, determines the necessary handler, and returns a response.

A request handler is a function that accepts a request and returns a response.
The middleware technique is best suited to add intermediate logic, such as query parameters, sessions, cookies, access rights.

Middleware is also a function that accepts a handler function and returns a new handler with augmented logic.
Also, each middleware can break the chain, depending on the circumstances.
Pattern decorator is a special case of Middleware. Therefore, our middleware is a bit different from those that are taken in Express.

Each heavy abstraction will replace by a function. This is convenient because, unlike classes, functions are composable.

### Core Components

#### Application Server — `lib/server.js`

Manages the lifecycle of the HTTP server. There are two functions that control the lifecycle of the application, these are the `startServer` and the `stopServer` functions respectively.

#### Application Handler — `lib/app.js`

Responsible for aggregating all the routes and wrapping them with any necessary middleware.

#### Application Middleware — `lib/middleware`

This folder is reserved for any wrapper functions that are used to modify the requests and responses. The main purpose of the middleware is to provide a central place for handling common tasks such as request validation.
Middleware is just a wrapper (decorator) for the request handler.

#### Application Routes — `lib/routes`

Aggregates the routes for handling all the requests to our application. All routes handlers are there.

### Template structure

```
.
├── LICENSE
├── README.md
├── lib
│   ├── app.js
│   ├── config
│   │   ├── index.js
│   │   ├── schema.js
│   │   └── validate.js
│   ├── logger.js
│   ├── middleware
│   │   ├── index.js
│   │   ├── wrap-ajv-validation.js
│   │   ├── wrap-api-handler.js
│   │   ├── wrap-catch-error.js
│   │   └── wrap-json-body.js
│   ├── routes
│   │   ├── books
│   │   │   ├── index.js
│   │   │   └── schema.js
│   │   ├── health-check.js
│   │   ├── index.js
│   │   └── not-found.js
│   └── server.js
├── package-lock.json
└── package.json
```

### Usage

- Clone the repository

```bash
git clone https://github.com/igat64/micro-template.git
```

- Install the dependencies

```bash
npm install
```

- Start the microservice

```bash
npm start
```

- Start in Development mode

```bash
npm run start:dev
```

### License

[MIT](https://github.com/igat64/micro-template/blob/master/LICENSE)
