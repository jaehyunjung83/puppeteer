const vision = require('@google-cloud/vision');

(async() => {
    const client = new vision.ImageAnnotatorClient();
console.log('client Start')
    const fileName = 'download.png';

    // Performs text detection on the local file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));
})();



