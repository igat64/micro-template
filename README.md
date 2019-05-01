# micro-template

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

### License

[MIT](https://github.com/igat64/micro-template/blob/master/LICENSE)
