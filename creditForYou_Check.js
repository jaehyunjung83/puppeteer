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
        location.href = "javascript:fn_browserCheck('/memb/memberFindId.do')"
    });
    console.log('팝업창 있으면 다 닫고 아이디찾기 location.href')

    await page.waitForNavigation();


    // await page.evaluate(() => window.location.href = "/memb/memberLoginView.do")
    // await page.waitForNavigation();


    

    //login 하겠다 knock. 이거 안 해도 상관 없음.
    // $.ajax({
    //     type: "POST",
    //     url: "/memb/niceAuthLogInsert.do",
    //     async: false,
    //     beforeSend: function (xhr) {
    //         xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
    //         var header = $("meta[name='_csrf_header']").attr("content");
    //         var token = $("meta[name='_csrf']").attr("content");
    //         xhr.setRequestHeader(header, token);
    //     }
    // }).done(function (data, textStatus, xhr) {
    //     confirmIdReceiveMethod()
    // }).fail(function (jqXHR, textStatus, errorThrows) {
    //     console.log("textStatus :::: " + textStatus);
    // });






    // user가 있는 지 1번 post해서 확인하고 있으면 id받을 방법 다시 post

    
    // ID찾기 form
    
    await page.evaluate(() => {

        $('#userBirth').val('19831206');
        $('#userName').val('정재현');
        $("#rdoMale")[0].checked = true;   //남자: rdoMale, 여자:rdoFemale
        $("#rdoCert")[0].checked = true; // rdoHp는 핸드폰인증

        openNice("X");  // NICE Auth시작
        
    });

    const newPagePromise = new Promise((x) =>
        browser.once("targetcreated", (target) => x(target.page()))
    );
    const popup = await newPagePromise;
    console.log("popup", popup)

    popup.setDefaultNavigationTimeout(60000000);

    popup.on("dialog", async (dialog) => {
        console.log("%c popup dialog: ", "background: white; color: blue; font-weight: bold; ", dialog.message());
        await dialog.accept();
    });

    // await popup.bringToFront();

    await popup.waitForNavigation()

    // 공동인증서 키보드 보안 우회(DOM) & 공동인증창 새로 띄우기
    await popup.evaluate(() => {
        $('#pubCertAgree')[0].click();
        // self.close();
        touchenexInfo.isInstalled = true;
        yettie.signFormNewUCPID($('#signMsg').val(), true, true, true, true, true, 'credit4u.or.kr', {
            encoding: 'hex'
        }, function resultCallback(result) {
            $("#signedMsg").val(result.signature);
            $("#storageType").val(result.storageType);
            console.log('success시: ', result.signature)

            if ($("#signedMsg").val() == null || $("#signedMsg").val() == "") {
                console.log("전자서명문 또는 식별번호 검증 메시지가 올바르지 않습니다.");
                return;
            }

            if (makeEncData(frm)) {
                document.frm.submit();
            }
        }, function errorCallback(error) {
            if (error.code == -9999) console.log('error시: ', error.code);  // 취소 버튼 이벤트 error.code: -9999
            else console.log(error.msg);
        });
    });
    console.log('%c popup에서 공동인증 가능처리', "background: red; color: black")

    const [, , yettie] = await popup.frames()
    console.log("🚀 ~ file: creditForYou.js:174 ~ yettie", yettie)

    await yettie.waitForNavigation();

    await yettie.waitForSelector("#notCertificateList");
    await yettie.waitForFunction(() => {
        return $("#notCertificateList").width() > 0
    })
    await yettie.waitForSelector("#certificate_file");
    await yettie.evaluate(() => $("#certificate_file").click())

    // await popup.waitForNavigation();
    console.log('인증서 찾기 li button click')

    const [fileChooser] = await Promise.all([
        popup.waitForFileChooser({ waitUntil: 'domcontentloaded' }),
        yettie.waitForSelector("#fileInputHidden"),
        yettie.evaluate(() => $("#fileInputHidden").click()),
    ]);
    await fileChooser.accept([
        "/Users/hyun_M1/Library/Preferences/NPKI/yessign/USER/cn=정재현()008804620180611188000055,ou=SHB,ou=personal4IB,o=yessign,c=kr/정재현()008804620180611188000055_2e51e7f8.pfx",
    ]);

    await yettie.waitForSelector("#hiddenPasswordInput");
    await yettie.type("#hiddenPasswordInput", "wjdwogus1@");

    await yettie.evaluate(() => $('#submit_btn').click());
    await yettie.evaluate(() => $('#submit_btn').click());

    await page.waitForResponse((res) => { return  res.url().includes('memberFindIdSendMethod.do')})


    console.log('memberFindIdSendMethod ajax response');

    const userInfo = await page.evaluate(() => {
        return $.ajax({
                type: "POST",
                url: "/memb/memberFindIdSendMethod.do",
                contentType : "application/json; charset=utf-8",
                dataType : "json",
                data: JSON.stringify({}),
                async: false,
                beforeSend : function (xhr) {
                    xhr.setRequestHeader("Accept","application/json; charset=utf-8");
                    var header = $("meta[name='_csrf_header']").attr("content");
                    var token = $("meta[name='_csrf']").attr("content");
                    xhr.setRequestHeader(header, token);
                }, 
                }).done(function(data, textStatus, xhr) {
                    if(data.success) {
                        console.log(textStatus)
                    }
                    else {
                        gfn_alert05(data.message);
                        return;
                    }
                }).fail(function (jqHTR, textStatus, errorThrows) {
                    gfn_alert05(jqHTR + " : "+textStatus);
                }).responseJSON;
        
    });
    console.log("🚀 ~ file: creditForYou_Check.js:270 ~ userInfo ~ userInfo", userInfo)








    // '찾기' button clikc 시 form post


    // Referer 오류('https://credit4u.or.kr:2443'로 referer 보내면 50 오류 res) 막기 위해
    // window.history.replaceState(null, '', 'https://credit4u.or.kr:2443/memb/memberFindId.do')

    // $.ajax({
    //     type: "POST",
    //     url: "/memb/inputCICheck.do",
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     data: JSON.stringify(form_data),
    //     beforeSend: function (xhr) {
    //         xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
    //         var header = $("meta[name='_csrf_header']").attr("content");
    //         var token = $("meta[name='_csrf']").attr("content");
    //         xhr.setRequestHeader(header, token);
    //     },
    // }).done(function (data, textStatus, xhr) {
    //     // CI 체크가 완료됏으면
    //     const resMatch = { '01': 'NICE인증정보 없음', '02': '주민번호 변환 안됨', '30': '사용자 없음', '50': '잘못된 접근(Referer오류)', '99': '입력한 정보와 NICE 인증정보 불일치 - 사용자 없음', '00': '성공' }
    //     console.log('inputCICheck', resMatch[data.iChk])


    //     // ID 핸드폰-이메일 어떤 걸로 받을 지 choice 방법을 post. masking된 id, email, phone data response
    //         $.ajax({
    //             type: "POST",
    //             url: "/memb/memberFindIdSendMethod.do",
    //             contentType: "application/json; charset=utf-8",
    //             dataType: "json",
    //             data: JSON.stringify({}),
    //             beforeSend: function (xhr) {
    //                 xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
    //                 var header = $("meta[name='_csrf_header']").attr("content");
    //                 var token = $("meta[name='_csrf']").attr("content");
    //                 xhr.setRequestHeader(header, token);
    //             },
    //         }).done(function (data, textStatus, xhr) {
    //             if (data.success) {
    //                 console.log('memberFindIdSendMethod data', data)
    //             }
    //             else {
    //                 console.log(data.message);
    //                 return;
    //             }
    //         }).fail(function (jqHTR, textStatus, errorThrows) {console.log(jqHTR + " : " + textStatus)});
    //     }).fail((data) => console.log(data))





})();