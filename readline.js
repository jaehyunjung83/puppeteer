const puppeteer = require('puppeteer');
const prompt = require('prompt');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000000);
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://google.com');
    
    await page.waitForSelector('#gb > div > div.gb_Re > a')
    await page.click('#gb > div > div.gb_Re > a')

    // prompt.start();
    // var result = await new Promise(function (resolve, reject) {
    //     prompt.get('id', function (err, result) {
    //         resolve(result);
    //     });
    // });

    // await page.evaluate(() => { 
    //     const input1 = document.createElement('input');
    //     input1.setAttribute('type', 'text');
    //     input1.setAttribute('value', '');
    //     input1.setAttribute('id', 'prompt');
    //     document.body.appendChild('input1');
    // });

    // await page.evaluate(() => {
    //     document.getElementById('#prompt').value.length > 18 ? document.getElementById('#identifierId').value = document.getElementById('#prompt').value : null
    // })

    // await page.type('#identifierId', result)

    await page.waitForSelector('#identifierId');
    await page.waitForFunction(() => {
        const username = document.getElementById('identifierId').value;
        console.log("🚀 ~ file: readline.js ~ line 37 ~ awaitpage.waitForFunction ~ username", username)
  
        return username.length == 6;
    })
    
    console.log('e-mail 입력완료!')

    await page.screenshot({path: 'googleLogin.png'});
})();