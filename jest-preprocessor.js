/* eslint-disable no-undef */
const fs = require("fs");

const config = fs.readFileSync("./.babelrc");

module.exports = require("babel-jest").createTransformer(JSON.parse(config));
