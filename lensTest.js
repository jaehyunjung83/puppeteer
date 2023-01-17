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
import axios from 'axios';
import fs from 'fs';
import * as stream from 'stream';
import { promisify } from 'util';

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

const blockingWait = seconds => {
    //simple blocking technique (wait...)
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while (waitTill > new Date()) {}
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

    const captchaName = `/Users/hyun_M1/Documents/nodeJS/Puppeteer/puppeteer/captcha_img/captchaTest.png`;

    const captchaByLens = async () => {
        var count = 0;
        while (true) {
          count++
        var captchaSolveText = '';
        count == 1 ? console.log('%c --lens 캡챠solve시작--', "background: white; color: blue; font-weight: bold; ") : console.log(`%c --lens 오류 ${count} 번째 재실행--`, "background: white; color: blue; font-weight: bold; ");
        
        
    
        axios.get('https://payinfo.or.kr/captcha/CaptChaImg.jsp?rand=0.18262341693990458',
        {responseType: 'stream'}
        )
        .then(res => res.data.pipe(fs.createWriteStream(captchaName)));
        
        
        // await frameset.waitForFunction(() => {
        //   const img = $('#catpcha > img')[0]
        //   return img.width > 0
        // },{timeout:0})
        
        const dayKO = dayjs().format("LL LTS");    
    
        // Performs text detection by Lens
    
    
        blockingWait(0.3);
    
        await page.evaluate(xInjection);
    
        await navigationPromise;
    
        // const uploadSelector = await page.waitForSelector(
        //   '#gb > div > div > div > div > div > div:nth-child(1) > div > div:nth-child(1) > div > div > span > div > button > div',
        // );
    
        const nCexist = async () => {
          const upload = await page.evaluate(() => $x('//span[contains(text(), "Upload")]'));
          upload
            ? await page.evaluate(
                () =>
                  ($x('//span[contains(text(), "Upload")]').length = 1
                    ? $x('//span[contains(text(), "Upload")]').click()
                    : $x('//span[contains(text(), "Upload")]')),
              )
            : await navigationPromise;
        };
        await nCexist();
    
        await navigationPromise;
    
        const computer = await page.waitForXPath('//span[.="Computer"]');
        console.log('Computer', computer);
        await page.waitForResponse(res => res);
        const [fileChooser] = await Promise.all([
          page.waitForFileChooser(),
          page.evaluate(() => $x('//span[.="Computer"]').click()),
        ]);
        await page.waitForResponse(res => res);
        await fileChooser.accept([captchaName]);
        console.log(`${captchaName} Uploaded!`);
        // await navigationPromise;
    
        // await page.waitForResponse(res => {return res.remoteAddress === '142.250.196.142:443'})
        await page.waitForResponse(res => {
          return res.url().includes('play.google.com');
        });
        // await page.waitForXPath('//input[contains(@data-corner-type, "1")]', {waitUntil: 'visible'});
        await page.waitForFunction(() => {
          return $x('//input[contains(@data-corner-type, "1")]').clientWidth > 0;
        })
    
        const TextButtonSize = await page.evaluate(() => { return $x('//button[contains(@aria-label, "Switch to Text mode")]').clientWidth });
        console.log("🚀 ~ file: lensTest.js:182 ~ captchaByLens ~ TextButtonSize", TextButtonSize)
        await page.evaluate(() => $x('//button[contains(@aria-label, "Switch to Text mode")]').click()),
          // blockingWait(1);
    
        console.log('Text Button Click()');
    
        
    
        await page.waitForResponse(res => {
          return res.url().includes('batchexecute');
        });
    
        
        await page.waitForXPath('//span[.="Select all text"]');
        await page.evaluate(() => $x('//span[.="Select all text"]').click());
    
        await page.waitForFunction(() => {
          const textReadDiv = $x('//div[contains(@jsname, "r4nke")]').innerText
        return textReadDiv.length > 0
        },{timeout: 0},)
      
    
        console.log('Select all text Click()');
    
    
        const lensResultText = await page.evaluate(() => {
          return $x('//div[starts-with(@jsaction, "contextmenu")]').innerText;
        });
        console.log('🚀 ~ file: payinfo.js ~ line 479 ~ lensResultText ~ lensResultText', lensResultText);
    
        // 특수문자만 골라 제거
        const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
    
        const refinedResult = lensResultText.replace(reg, '');
    
        blockingWait(0.3);
    
        fs.rename(
            captchaName,
            `/Users/hyun_M1/Documents/nodeJS/Puppeteer/puppeteer/captcha_img/(${count})_${refinedResult}.png`,
            (err) => console.log(err)
        );
    
        if (lensResultText == 1) { 
            console.log('success & captchaName change')
        }
        
        };
      };
    
    
    
      try {
        const solvedCaptcha = await captchaByLens();
        console.log('🚀 ~ file: payinfo.js ~ line 395 ~ solvedCaptcha', solvedCaptcha);
      } catch {
        await captchaByLens();
      }
    




      console.log('%c captcha loop async 안 되고 있음 ', "background: white; color: red; font-weight: bold; ");
      
      axios.get('https://payinfo.or.kr/captcha/CaptChaImg.jsp?rand=0.1', {responseType: 'stream'})
      .then(res => res.data.pipe(fs.createReadStream(captchaName.replace('captchaTest', 'asyncFailed'))));
    




    await navigationPromise;

})();
        
