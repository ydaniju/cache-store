# Cache Store

A key-value store for generating radom data for your keys

## Getting Started

### Prerequisites

- Node v8.9.4
- Mongo v4.0.2
- Yarn 1.10.1

### Installing

1. Clone project  `git clone https://github.com/ydaniju/cache-store`

2. Run `cd cache-store`

3. Run `yarn`

4. Start server in development using `yarn start:dev`

## Running the tests

### Unit Tests

Run `yarn test`

### Coding style tests

Run `yarn lint`

## Deployment

Before deploying

- Replace the start script in `package.json` with `NODE_ENV=production node server.js`

- Create another script `start:dev` with value of the old start script ie `NODE_ENV=development node server.js`

- You can now use `yarn start:dev` in development and `yarn start` in production

## Built With

* [Node](https://nodejs.org/) - JavaScript Runtime
* [Express](https://expressjs.com/) - The web framework
* [Mongoose](https://mongoosejs.com/) - The ODM
* [Yarn](https://yarnpkg.com/) - Dependency Management

## Contributing

Contact @ydaniju <danijuyusuf@outlook.com>

## License

This project is licensed under the MIT License.
