const fs = require("fs");

let result = [];

for (let i = 1; i < 4; i++) {
    let toReadFile = fs.readFileSync(`${i}.json`, 'utf-8', (err, json) => json);
    i === 1 ?
        fs.writeFileSync('123.json', toReadFile)
        : fs.appendFileSync('123.json', toReadFile);
    i === 3 ? console.log(fs.readFileSync('123.json', 'utf-8')) : null
}






