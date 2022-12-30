// const puppeteer = require("puppeteer");
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteerExtraPluginUserAgentOverride from 'puppeteer-extra-plugin-stealth/evasions/user-agent-override/index.js';
import { writeFileSync, appendFileSync } from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
dayjs.extend(localizedFormat);
import download from 'image-downloader';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { Tabletojson as tabletojson } from 'tabletojson';
const SQLiteMessagesDB = `${process.env.HOME}/Library/Messages/chat.db`;
// const sqlite3 = require('sqlite3').verbose()
import verbose from 'sqlite3';
const sqlite3 = verbose;
import clipboard from 'clipboardy';

const stealthPlugin = StealthPlugin();
stealthPlugin.enabledEvasions.delete('user-agent-override');
puppeteer.use(stealthPlugin);
const pluginUserAgentOverride = puppeteerExtraPluginUserAgentOverride({
    userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
    platform: 'Win32',
});
puppeteer.use(pluginUserAgentOverride);

const xInjection = () => {
    window.$x = xPath => document
        .evaluate(
            xPath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        )
        .singleNodeValue;
};

const blockingWait = (seconds) => {
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while (waitTill > new Date()) { }

}


(async () => {
    const browser = await puppeteer.launch(
        {
            headless: false,
            // devtools: true,
            args: [
                // '--start-fullscreen',
                // "--window-size=1920,1080",
                // "--disable-notifications",
                '--disable-web-security',
                // '--disable-features=IsolateOrigins',
                // '--disable-features=BlockInsecurePrivateNetworkRequests',
                // '--disable-site-isolation-trials'
            ],
        },
        // { userDataDir: './user-data-dir' }
    );

    const page1 = await browser.newPage();


    await page1.setCacheEnabled(true);


    await page1.setRequestInterception(true);

    page1.on('request', req => {
        switch (req.resourceType()) {
            case 'font':
            case 'image':
                // console.log('img req.url()', req.url());
                if (!req.url().includes('captcha')) {
                    req.abort();
                    break;
                } else { console.log('req.url(): ', req.url()) }
            default:
                req.continue();
        }
    });




    page1.setDefaultNavigationTimeout(60000000);


    const navigationPromise1 = page1.waitForNavigation();


    page1.on('dialog', async dialog => {
        console.log('dialog', dialog);
        await dialog.accept();
    });


    await page1.goto('https://www.scourt.go.kr/portal/information/events/search/search.jsp', {
        waitUntil: 'networkidle2',
    });


    const page2 = await browser.newPage();
    page2.setDefaultNavigationTimeout(60000000);
    await page2.setCacheEnabled(true);
    const navigationPromise2 = page2.waitForNavigation();
    await page2.goto('https://bit.ly/glensocr', {
        waitUntil: 'networkidle0',
    });


    var responsedText = {}
    
    page2.on('response', async res => {
        if (res.url().includes('batchexecute')) {
                                    
            const resText = await res.text()
            
            
            const test3 = resText.match(/\W{4}\d{6}\W{2}/g);
            responsedText = test3[0].replace(/\D/g, '');
            console.log("🚀 ~ file: lensTabMoveRes.js ~ line 127 ~ responsedText", responsedText)
            
        }
    });



    await navigationPromise2;

    await page1.evaluate(xInjection);
    await navigationPromise1;
    await page2.evaluate(xInjection);
    await navigationPromise2;

    await page1.bringToFront();
    blockingWait(0.3);

    const page1Frames = await page1.frames();
    const [, scourtFrame] = await page1.frames();
    await scourtFrame.evaluate(xInjection);



    await scourtFrame.evaluate(() => $x('//option[contains(text(), "서울북부")]').selected = true);
    await scourtFrame.evaluate(() => onChangeBub());
    await scourtFrame.evaluate(() => $x('//option[contains(text(), "2021")]').selected = true);


    await scourtFrame.evaluate(() => $x('//option[contains(text(), "가소")]').selected = true);
    await scourtFrame.evaluate(() => $x('//input[contains(@title, "사건일련번호 입력")]').value = '365010');
    await scourtFrame.evaluate(() => $x('//input[contains(@title, "당사자명 입력")]').value = '정재현');

    const captchaRoutine = async (i) => {
        console.log(`${i + 1}th Try`)
        console.time(`${i + 1}'s lens Try`)

        // i > 0 ? await scourtFrame.evaluate(() => reloadCaptcha()) : null;
        i > 0 ? await scourtFrame.evaluate(() => $x('//a[contains(@title, "자동입력방지문자 새로고침")]').click()) : null;


        const captchaImg = await scourtFrame.waitForSelector('#captcha > img');
        await scourtFrame.waitForFunction(() => {
            const img = $('#captcha > img')[0]
            return img.width > 0
        })


        // blockingWait(1)

        const tabTestCaptcha = await captchaImg.screenshot({ path: `tabTestcaptcha(${i + 1}).png` });

        await page2.bringToFront();
        // blockingWait(1);


        const uploadSelector = await page2.waitForSelector('#gb > div > div > div > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > span > div > button > div')


        const nCexist = async () => {
            const upload = await page2.evaluate(() => $x('//span[contains(text(), "Upload")]'))
            upload ?
                await page2.evaluate(() =>
                    $x('//span[contains(text(), "Upload")]').length = 1
                        ? $x('//span[contains(text(), "Upload")]').click()
                        : $x('//span[contains(text(), "Upload")]')
                )
                : await page2.waitForNavigation();
        };
        await nCexist();

        console.log('Computer')
        const computer = await page2.waitForXPath('//span[contains(text(), "Computer")]');


        const [fileChooser] = await Promise.all([
            page2.waitForFileChooser(),
            page2.evaluate(() => $x('//span[contains(text(), "Computer")]').click()),
        ]);



        const [response] = await Promise.all([
            await fileChooser.accept([`tabTestcaptcha(${i + 1}).png`]),
            // await fileChooser.accept(["nothing.jpg"]);
            console.log(`tabTestcaptcha(${i + 1}).png choose&uploaded!`),
            await page2.waitForResponse((res) => { return res.url().includes('batchexecute') })
        ]);
        const uploadNres = await response;
        console.log("🚀 ~ file: lensTabMoveRes.js ~ line 215 ~ captchaRoutine ~ uploadNres", uploadNres)
        

        await page2.waitForNavigation({
            waitUntil: 'networkidle0',
        });

        const textButton = await page2.waitForXPath('//span[contains(text(), "Text")]');
        console.log("🚀 ~ file: lensTabMove.js ~ line 191 ~ captchaRoutine ~ textButton", textButton)
        
        
        

        const whenSuccess = async () => {
            console.log('whenSuccess')
            

            await page1.bringToFront();
            blockingWait(0.3);

            
            await scourtFrame.evaluate((responsedText) => $x('//input[contains(@name, "answer")]').value = responsedText, responsedText)
            
        };

        // Lens 글자 인식 실패
        try {
            await whenSuccess();
        } catch {
            async (err) => {
                await captchaRoutine(i);
            }
        }



        console.timeEnd(`${i + 1}'s lens Try`)

    };


    for (let i = 0; i < 5; i++) {

        await captchaRoutine(i);
    }


    await navigationPromise1;

})();


