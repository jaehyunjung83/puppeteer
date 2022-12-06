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
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, onValue, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyCTfD88e8xfwTzdzaiit4Ze01ntDLtSYho',
    authDomain: 'lunar-5abf5.firebaseapp.com',
    databaseURL: 'https://lunar-5abf5-payinfotest-d37a2.firebaseio.com/',
    projectId: 'lunar-5abf5',
    storageBucket: 'lunar-5abf5.appspot.com',
    messagingSenderId: '135894682543',
    appId: '1:135894682543:web:357b3079bfae5ef12a7d5a',
    measurementId: 'G-BCDMP8HXF6',
};
const app = initializeApp(firebaseConfig);

const database = getDatabase();
const startRef = ref(database, '/payinfo/');

const stealthPlugin = StealthPlugin();
stealthPlugin.enabledEvasions.delete('user-agent-override');
puppeteer.use(stealthPlugin);
const pluginUserAgentOverride = puppeteerExtraPluginUserAgentOverride({
    userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
    platform: 'Win32',
});
puppeteer.use(pluginUserAgentOverride);

const atrequest = async () => {

    const browser = await puppeteer.launch(
        {
            headless: false,
            devtools: false,
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

    await page.setCacheEnabled(false);

    await page.setRequestInterception(true);

    page.on('request', req => {
        // console.log("🚀 ~ file: payinfo.js ~ line 70 ~ req.url()", req.url())

        switch (req.resourceType()) {
            case 'font':
            case 'image':
                if (!req.url().includes('captcha')) {
                    req.abort();
                    break;
                }
            default:
                req.continue();
        }
        // req.continue();
    });

    const xInjection = () => {
        window.$x = xPath =>
            document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    };

    page.setDefaultNavigationTimeout(60000000);

    const blockingWait = seconds => {
        //simple blocking technique (wait...)
        var waitTill = new Date(new Date().getTime() + seconds * 1000);
        while (waitTill > new Date()) { }
    };

    const navigationPromise = page.waitForNavigation();

    await page.goto('https://at.kicpa.or.kr/spvr/login.jsp', {
        waitUntil: 'networkidle0',
    });

    await page.evaluate(xInjection)
    await page.evaluate(() => $x('//input[@type="text"]').value = '01088957500')
    await page.evaluate(() => $x('//input[@type="password"]').value = 'kicpa12345')
    await page.evaluate(() => go_login());

    await page.waitForSelector('#partialDiv > p.btn_right > a:nth-child(3)')
    await page.evaluate(() => location.href = '/spvr/acc/acc03002w.jsp?mode=reg');

    await page.waitForSelector('table')

    await page.evaluate(xInjection)
    const radio = await page.evaluate(() => { return $x('//table').contains($x('//input[@type="radio"]')) })
    console.log("🚀 ~ file: AT.js ~ line 118 ~ atrequest ~ radio", radio)

    await navigationPromise;






};

function timerFunc(){

    var oprDate = new Date();
    // var oprDate = new Date('2022', '11', '05', '20', '44', '40');
    // console.log("🚀 ~ file: AT.js ~ line 136 ~ timerFunc ~ oprDate", oprDate)

    var nowDate = new Date();
    console.log("🚀 ~ file: AT.js ~ line 137 ~ timerFunc ~ nowDate", nowDate)

    var timer = oprDate.getTime() - nowDate.getTime(); //동작시간의 밀리세컨과 현재시간의 밀리세컨의 차이를 계산합니다.
    console.log("🚀 ~ file: AT.js ~ line 139 ~ timerFunc ~ timer", timer)
    if(timer < 0){ //타이머가 0보다 작으면 함수를 종료합니다.
       return;
    }else{
       setTimeout(() => atrequest(), timer);
    }
}
timerFunc()

