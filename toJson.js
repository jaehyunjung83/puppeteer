
// const tabletojson = require('tabletojson').Tabletojson;
const fs = require("fs");
const {Tabletojson: tabletojson} = require('tabletojson/dist');


// when web
// (async () => {

//     await tabletojson.convertUrl(
//         'https://www.npmjs.com/package/tabletojson',
//         (tablesAsJson) => {
//             fs.writeFileSync('npmexam.json', JSON.stringify(tablesAsJson[1]))
//         }
//     )
//     .then(() => {
//         const npmexam = fs.readFileSync(`${__dirname}/npmexam.json`, 'utf-8')
//         console.log("🚀 ~ file: toJson.js ~ line 18 ~ npmexam", JSON.parse(npmexam))
//     })
//     ;

// })();


// when local
(async () => {
    const html = fs.readFileSync(`${__dirname}/detail_0.html`, 'utf-8')
    
    const converted = await tabletojson.convert(html)
    console.log("🚀 ~ file: toJson.js ~ line 30 ~ converted", converted)
    
    // .then(() => {
    //     const npmexam = fs.readFileSync(`${__dirname}/npmexam.json`, 'utf-8')
    //     console.log("🚀 ~ file: toJson.js ~ line 18 ~ npmexam", JSON.parse(npmexam))
    // })
    // ;

})();


은행명
#contents > div:nth-child(3) > div.tbl_list_inquiry2.stripes > table > tbody > tr:nth-child(1) > td:nth-child(1)
p tag들
for (let i = 0; i < 44; i++ ) {
    console.log(`${i}:`, p[i].innerText) 
}

합계
#contents > div:nth-child(3) > div.tbl_list_inquiry2.stripes > table > tbody > tr:nth-child(1) > td:nth-child(8)