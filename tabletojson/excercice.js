const tabletojson = require('tabletojson').Tabletojson;
const fs = require("fs");
const path = require('path');

const currentDirectory = __dirname 
console.log("🚀 ~ file: excercice.js ~ line 6 ~ currentDirectory", currentDirectory)

const readhtml = fs.readFileSync(`${currentDirectory}/example.html`, 'utf-8', (html) => html)
console.log("🚀 ~ file: excersice.js ~ line 5 ~ readhtml", readhtml)


