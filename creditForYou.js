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
        location.href = "javascript:fn_browserCheck('/memb/memberSelfAuth.do');"
    });
    console.log('팝업창 있으면 다 닫고 회원가입 location.href')

    await page.waitForNavigation();

    // await page.evaluate(() => {
    //     $('#tearm_item_base')[0].click();
    // });
    await page.evaluate(() => {
        $('#tearm_item_base')[0].checked = true;
        $('#tearm_item01')[0].checked = true;
        $('#tearm_item01-01')[0].checked = true;
        $('#tearm_item01-02')[0].checked = true;
        $('#tearm_item02')[0].click();
    });

    await page.evaluate(() => {
        $('#popupChk3').click();
        $('#confirmTerm03').click();
    });

    await page.evaluate(() => {
        $('#userName').val('정재현');
        $('#userJuminNo1').val('831206');
        $('#userJuminNo2').val('1001722');
    });
    await page.evaluate(() => {

        console.log('jumin2 hash value', npVCtrl.keypadObject[0]._hashelement[0].value);

        $('#rdoCert')[0].checked = true;
        $('#a_next').click();
    });

    console.log('회원가입 폼 작성 후 공인인증버튼클릭')

    await navigationPromise;

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


    await page.waitForNavigation();

    await page.evaluate(() => {
        $('#edtHP').val('01088957500');
        $('#userId').val('jjjh1983');
        $('#btnIdChk').click();
    });

    await page.waitForFunction(() => {
        return $('a.btn_id_confirm').width() > 0
    })
    await page.evaluate(() => $('a.btn_id_confirm').click());
    await page.evaluate(() => {
        $('#edtPwd1').val('wjdwogus1@');
        $('#edtPwd2').val('wjdwogus1@');
        $('#edtMail1').val('jjjh1983');
        $('#selMail2 > option[value="naver.com"]').prop('selected', true);
        $('#btnSendAuthNum').click();
    });

    const emailAuthNumber = [];

    var imapConfig = {
        imap: {
            user: 'jjjh1983@naver.com',
            password: 'wjdwogus7*',
            host: 'imap.naver.com',
            port: 993,
            tls: true
        }
    };

    const blockingWait = seconds => {
        //simple blocking technique (wait...)
        var waitTill = new Date(new Date().getTime() + seconds * 1000);
        while (waitTill > new Date()) { }
    };

    const retriveAuthNum = async () => {
        console.log('email auth retrive')
        imaps
            .connect(imapConfig)
            .then((connection) => {
                var now = new Date();
                var timeAgo = new Date();
                timeAgo.setMinutes(timeAgo.getMinutes() - 1);

                return connection.openBox('INBOX')
                    .then(() => {
                        var searchCriteria = [
                            ['HEADER', 'from', 'mail@kcredit.or.kr'],
                            ['SINCE', now.toISOString()], // 날짜 기준만 적용 가능
                        ];
                        var fetchOptions = { bodies: ['HEADER', 'TEXT', ''], };
                        return connection
                            .search(searchCriteria, fetchOptions)
                            .then((messages) => {
                                console.log(`whole messages length: ${messages.length}`)
                                var count = 0;
                                messages.forEach((item) => {

                                    var all = _.find(item.parts, { "which": "" })
                                    var id = item.attributes.uid;
                                    var idHeader = "Imap-Id: " + id + "\r\n";
                                    simpleParser(idHeader + all.body, (err, mail) => {
                                        count++
                                        // access to the whole mail object
                                        if (mail.date > timeAgo) {
                                            console.log(`${count} -> ${timeAgo} received mail was found`)
                                            console.log(mail.date) + console.log(mail.subject)
                                            const body = mail.date + mail.html
                                            fs.writeFile('./nodeimap_' + id + '.html', body, () => console.log())
                                            const text = mail.text
                                            console.log('RegEx: ', text.match(/\s*(\d{6})\s*/g))
                                            const authResult = text.match(/\s*(\d{6})\s*/g);
                                            emailAuthNumber.push(authResult[0].trim())
                                            console.log("🚀 ~ file: creditForYou.js:302 ~ simpleParser ~ emailAuthNumber", emailAuthNumber)
                                            
                                        } else {
                                            console.log(`${count} -> ${timeAgo} received mail was not found`)
                                        }
                                    });
                                });
                            })
                            .then(() => connection.end());
                    });
            });

    };

    blockingWait(3);

    const authType = await Promise.all([
        retriveAuthNum(),
        page.waitForSelector('#edtAuthNum'),
    ]);

    await page.type('#edtAuthNum', emailAuthNumber[emailAuthNumber.length-1])
    

    await page.waitForSelector('#btnAuthConfirm');

})();