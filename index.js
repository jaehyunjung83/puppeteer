const DOMAIN = 'https://demo.tutorialzine.com/2009/09/simple-ajax-website-jquery'
const URL = DOMAIN + '/demo.html'
const download = require('image-downloader')
const puppeteer = require('puppeteer'); //phải có ";"

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
        })
        const page = await browser.newPage()
        await page.goto(URL)
        await page.click('#navigation > li:nth-child(3) > a')
        /*
        * <div id="pageContent">
        * ...
        * <img src="img/kitten.jpg"/>
        * </div>
        */
        await page.waitForSelector('div#pageContent img')
        const imgMeoUrl = await page.evaluate(() => {
            return document.querySelector('div#pageContent img').getAttribute('src')
        })
        // console.log(imgMeoUrl)
        const options = {
            url: DOMAIN + '/' + imgMeoUrl,
            dest: 'images'
        };
        await download.image(options)
            .then(({ filename }) => {
                console.log('Saved to', filename)
            })
            .catch(err => console.error("ERR save!!! " + err))
        await browser.close()
    } catch (err) {
        console.log("ERR async!!! " + err)
    }
})()