import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteerExtraPluginUserAgentOverride from 'puppeteer-extra-plugin-stealth/evasions/user-agent-override/index.js';
import fs from 'fs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko.js'
dayjs.locale('ko')
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
dayjs.extend(localizedFormat);
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, onValue, set } from 'firebase/database';
import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';
import _ from 'lodash';



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
const startRef = ref(database, '/credit4u/');

const stealthPlugin = StealthPlugin();
stealthPlugin.enabledEvasions.delete("user-agent-override");
puppeteer.use(stealthPlugin);
// const pluginUserAgentOverride = puppeteerExtraPluginUserAgentOverride({
//     userAgent:
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
//     platform: "Win32",
// });
// puppeteer.use(pluginUserAgentOverride);

(async () => {
    const start = performance.now();
    const browser = await puppeteer.launch(
        { headless: false, defaultViewport: null, },
        {
            args:
                [
                    // "--window-size=1920,1080",
                    // "--start-maximized",
                    "--disable-notifications"]
        },

        // { userDataDir: './user-data-dir' }
    );

    const page = await browser.newPage();


    await page.setRequestInterception(true);

    page.on("request", (req) => {
        switch (req.resourceType()) {
            // case "stylesheet":
            case "font":
                // case "image":
                req.abort();
                // console.log("img 없앤 중단점", req);
                break;
            default:
                req.continue();
            // console.log('일반 중단점')
            // break;
        }
    });

    page.on("dialog", async (dialog) => {
        console.log("%c page dialog: ", "background: white; color: blue; font-weight: bold; ", dialog.message());
        await dialog.accept();
    });

    page.setDefaultNavigationTimeout(0);

    const navigationPromise = page.waitForNavigation();

    await page.goto("https://credit4u.or.kr:2443", {
        waitUntil: "networkidle0",
    });

    page.setDefaultNavigationTimeout(60000000);

    const xInjection = () => {
        window.$x = xPath =>
            document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    };
    await page.evaluate(xInjection);
    const dimensions = await page.evaluate(() => {
        return {
            width: screen.width,
            height: screen.height
        };
    });

    await page.setViewport({
        width: dimensions.width,
        height: dimensions.height
    });


    await page.evaluate(() => {
        $('.layerPopupArea') ? $('.layerPopupArea').remove() : null;
        location.href = "javascript:fn_browserCheck('/memb/memberSelfAuth.do');"
    });
    console.log('팝업창 있으면 다 닫고 회원가입 location.href')

    await page.waitForNavigation();

    
    await page.evaluate(() => window.location.href = "/memb/memberLoginView.do")
    await page.waitForNavigation();


    await page.evaluate(() => {
        $('#form1')[0][10].value = 'jjjh1983';
        $('#form1')[0][12].value = 'wjdwogus1@';
        $('#form1')[0][14].value = '123456';    //CAPTCHA input에는 6자리 아무거나
        window.chkCaptcha = () => { return true };  //CAPTCHA check function force to "true"
        $('#login').click();
    });
    await page.waitForNavigation();
    console.log('after login')
    // 회원정보(열람)
    await page.evaluate(() => window.location.href="/memb/memberVerifyPwd.do")

    await page.waitForSelector('#edtPwdConf');
    await page.evaluate(() => {
        $('#edtPwdConf').val('wjdwogus1@');
        $("#verifyPwdForm").submit();
    });
    
    await page.waitForNavigation();
    console.log('login 후 초기 페이지 return')
    await page.evaluate(() => location.href="/memb/memberWithdrawal.do");
    console.log('after 회원탈퇴 링크클릭')
    
    
    await page.waitForSelector('#btnWithdrawal');

    const withdrawal = await page.evaluate(async() => {
        
        
        return await $.ajax({
			type: "POST",
			url: "/memb/memberWithdrawalAction.do",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			beforeSend : function (xhr) {
				xhr.setRequestHeader("Accept","application/json; charset=utf-8");	
				var header = $("meta[name='_csrf_header']").attr("content");
				var token = $("meta[name='_csrf']").attr("content");
				xhr.setRequestHeader(header, token);
			}, 
			data: JSON.stringify({userId: ''}),
            success: (data) => console.log(data)
		});

        
    });
    console.log("🚀 ~ file: creditForYou_out.js:165 ~ withdrawal ~ withdrawal", withdrawal)

    


    const end = performance.now();
    
    const elapsed = end - start;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(0);
    
    console.log(`회원탈퇴: ${minutes}:${remainingSeconds}`);

    withdrawal.success ? await browser.close() : await page.waitForNavigation();

    process.exit();

})();