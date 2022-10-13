require('dotenv').config();                           // To load executable paths from .env file
const PdfOcr = require('node-pdf-ocr');

PdfOcr('1.pdf')
    .then((text) => console.log(text))
    .catch((err) => console.error(err));