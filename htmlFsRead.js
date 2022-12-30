import fs from 'fs';


fs.readFile("nodeMailerTemplate.html", (err, data) => console.log('data', data))