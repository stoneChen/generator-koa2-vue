module.exports = {
  root: true,
  env: {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parser": "babel-eslint",
  globals: {
    // "window": true,
  },
  parserOptions: {
    // "ecmaVersion": 6,
    // "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  extends: "airbnb/base",
  // required to lint *.vue files
  plugins: [
    "html"
  ],

  // add your custom rules here
  "rules": {
    "no-reserved-keys": [0],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-alert": [0],
    "semi": [2, "never"],
    "no-console": [0],
    "prefer-const": [0],
    "eol-last": [0],
    "no-param-reassign": [0],
    "func-names": [0],
    "no-shadow": [1],
    "arrow-body-style": [0],
    "comma-dangle": [0],
    "space-before-function-paren": [0],
    "prefer-template": [0],
    "no-new": [0],
    "consistent-return": [0],
    "quote-props": [0],
    "array-bracket-spacing": [0],
    "no-unused-vars": [1],
    "computed-property-spacing": [0]
  }
}
