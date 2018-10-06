module.exports = {
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  },
  "extends": ["eslint:recommended", "google"],
  "parserOptions": {
    "ecmaVersion": 6
  },
  "overrides": [
    {
      "files": ["server.js"],
      "rules": {
        "no-console": "off"
      }
    }
  ]
};
