# micro-template

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
