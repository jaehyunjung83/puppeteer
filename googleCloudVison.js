const vision = require('@google-cloud/vision');

(async() => {
    const client = new vision.ImageAnnotatorClient();
console.log('client Start')
    const fileName = 'payinfoCaptchaImg.png';

    // Performs text detection on the local file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    const fulltextDetections = result.fullTextAnnotation
    console.log("🚀 ~ file: googleCloudVison.js ~ line 12 ~ fulltextDetections", fulltextDetections.pages)
    // console.log("🚀 ~ file: googleCloudVison.js ~ line 12 ~ fulltextDetections", fulltextDetections.pages[0].blocks[0].paragraphs[0].words[0].symbols)
    // detections.forEach(text => {
    //     return console.log(text.description)
    // })
    console.log(`${fileName}` + `s Text: ${detections[1].description}`)
    
})();



