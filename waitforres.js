import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteerExtraPluginUserAgentOverride from 'puppeteer-extra-plugin-stealth/evasions/user-agent-override/index.js';;
import puppeteer from 'puppeteer-extra';
// import { Page } from 'puppeteer';


const stealthPlugin = StealthPlugin();
stealthPlugin.enabledEvasions.delete('user-agent-override');
puppeteer.use(stealthPlugin);
const pluginUserAgentOverride = puppeteerExtraPluginUserAgentOverride({
    userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
    platform: 'Win32',
});
puppeteer.use(pluginUserAgentOverride);


let reqCount = 0;
let resCount = 0;

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: false,
        args: ['--disable-web-security',],
    },);
    const page = await browser.newPage();
    // const userAgent = new UserAgent({ deviceCategory: 'desktop' });
    // await page.setUserAgent(userAgent.random().toString());

    await page.goto('https://bit.ly/glensocr', { waitUntil: "networkidle0" });

    const wantedUrl = 'https://bit.ly/glensocr';

    const xInjection = () => {
        window.$x = xPath =>
            document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    };

    await page.evaluate(xInjection);

    // page.on('request', req => {
    //     reqCount++;
    //     if (req.url() == wantedUrl) {
    //         console.log('The request I need: ', req.url());
    //         console.log(reqCount);
    //     }
    // })
    page.on('response', async(res) => {
        
        res.url().includes('play.google.com') ? console.log(await res.json()): null

    })



    const nCexist = async () => {
        const upload = await page.evaluate(() => $x('//span[contains(text(), "Upload")]'));
        upload
            ? await page.evaluate(
                () =>
                ($x('//span[contains(text(), "Upload")]').length = 1
                    ? $x('//span[contains(text(), "Upload")]').click()
                    : $x('//span[contains(text(), "Upload")]')),
            )
            : null;
    };
    await nCexist();

    const computer = await page.waitForXPath('//span[.="Computer"]');

    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.evaluate(() => $x('//span[.="Computer"]').click()),
    ]);
    await page.waitForResponse(res => res);
    await fileChooser.accept(['payinfoCaptchaImg.png']);
    console.log('file Uploaded!');
    const waitRes = await page.waitForResponse(res => res.url().includes('https://play.google.com'));
    console.log("🚀 ~ file: waitforres.js ~ line 80 ~ waitRes", waitRes)

    console.log('before Text Click')
    await page.evaluate(() => $x('//button[contains(@aria-label, "Switch to Text mode")]').click());
    
    console.log('after Text Click')
    const resultRes = await waitRes.json()
    console.log("🚀 ~ file: waitforres.js ~ line 85 ~ resultRes", resultRes)

})();