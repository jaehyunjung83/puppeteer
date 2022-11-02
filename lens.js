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

    const page = await browser.newPage();

    await page.setCacheEnabled(true);

    // await page.setRequestInterception(true);

    // page.on('request', req => {
    //     switch (req.resourceType()) {
    //         // case 'font':
    //         //     // case "image":
    //         //     req.abort();
    //         //     break;
    //         default:
    //             req.continue();
    //     }
    // });

    page.setDefaultNavigationTimeout(60000000);

    const navigationPromise = page.waitForNavigation();
    page.on('dialog', async dialog => {
        console.log('dialog', dialog);
        await dialog.accept();
    });

    await page.goto('https://bit.ly/glensocr', {
        waitUntil: 'networkidle0',
    });

    await navigationPromise;
    
    

    await page.evaluate(xInjection);

    await navigationPromise;

    const uploadSelector = await page.waitForSelector('#gb > div > div > div > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > span > div > button > div')
    

    const nCexist = async () => {
        const upload = await page.evaluate(() => $x('//span[contains(text(), "Upload")]'))
        upload ?
            await page.evaluate(() =>
                $x('//span[contains(text(), "Upload")]').length = 1
                    ? $x('//span[contains(text(), "Upload")]').click()
                    : $x('//span[contains(text(), "Upload")]')
            )
            : await navigationPromise
    };
    await nCexist();

    await navigationPromise;    

    console.log('Computer')
    const computer = await page.waitForXPath('//span[contains(text(), "Computer")]');
    

    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.evaluate(() => $x('//span[contains(text(), "Computer")]').click()),
      ]);
    

    await fileChooser.accept([
    "/Users/hyun_M1/Downloads/captchaImg (2).png",
    ]);
    console.log('fileChoosed!')
    await navigationPromise;


    await page.waitForXPath('//span[contains(text(), "Text")]');
    // await page.evaluate(() => $x('/html/body/div[3]/c-wiz/div/c-wiz/div/div[1]/div/div[3]/div/div/span[2]/span/button/span[1]').click());
    await page.waitForNavigation({
        waitUntil: 'networkidle0',
      });
    await page.evaluate(() => $x('//span[contains(text(), "Text")]').click());
    console.log('Text Click()')
    await page.waitForNavigation({
        waitUntil: 'networkidle0',
      });
    await page.waitForXPath('//span[contains(text(), "Select all text")]')
    // await page.evaluate(() => $x('/html/body/div[3]/c-wiz/div/c-wiz/div/div[2]/div/div/div/div/div[1]/div/div[2]/div/button/div[3]').click())

    await page.evaluate(() => $x('//span[contains(text(), "Select all text")]').click())
    console.log('Select all text Click()')
    
    await page.waitForNavigation({
        waitUntil: 'networkidle0',
      });

    
    const resultText = await page.evaluate(() => {
        return ($x('//div[starts-with(@jsaction, "contextmenu")]').innerText)
    });  
    

    // await page.waitForXPath('//span[contains(text(), "Copy text")]')
    
    // await page.evaluate(() => $x('//span[contains(text(), "Copy text")]').click());




    await navigationPromise;

})();