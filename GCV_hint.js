const vision = require('@google-cloud/vision');

async function quickstart() {
    const vision = require('@google-cloud/vision');
  
    const client = new vision.ImageAnnotatorClient();
  
    const request = {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri": "https://re-ply.r-e.kr/captchaImg%20(6).png"
            }
          },
          "features": [
            {
              "type": "DOCUMENT_TEXT_DETECTION"
            }
          ],
          "imageContext": {
            "languageHints": ["en"]
          }
        }
      ]
    };
  
    const [result] = await client.batchAnnotateImages(request);
    console.log("🚀 ~ file: GCV_hint.js ~ line 29 ~ quickstart ~ result", result.responses[0])
    const detections = result.responses[0].fullTextAnnotation;
    console.log('fullTextAnnotation: ', detections);
    console.log('fullTextAnnotation.pages[0].blocks[0].paragraphs[0].words: ', detections.pages[0].blocks[0].paragraphs[0].words);
  }
  
  quickstart().catch(console.error);