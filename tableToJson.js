


const tabletojson = require('tabletojson').Tabletojson;
const fs = require('fs');
const path = require('path');


// const {Tabletojson: tabletojson} = require('../dist');

// tabletojson.convertUrl(
//     'https://www.timeanddate.com/holidays/ireland/2017',
//     {useFirstRowForHeadings: true},
//     function(tablesAsJson) {
//         console.log(tablesAsJson);
//     }
// );

const html = fs.readFileSync(path.resolve(__dirname, 'qryAcntSum.html'), {encoding: 'UTF-8'});
const converted = tabletojson.convert(html);
fs.writeFileSync('converted.json', JSON.stringify(converted))