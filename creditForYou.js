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
import { getDatabase, ref, update } from 'firebase/database';
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
    // console.time('회원가입&ins조회')
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
    // console.log("🚀 ~ file: creditForYou.js:174 ~ yettie", yettie)

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

    var now = new Date();
    var timeAgo = new Date();
    timeAgo.setMinutes(timeAgo.getMinutes() + 1);


    var imapConfig = {
        imap: {
            user: 'jjjh1983@naver.com',
            password: 'wjdwogus7*',
            host: 'imap.naver.com',
            port: 993,
            tls: true,
            timeout: 10000 // 10 seconds
        }
    };

    const blockingWait = seconds => {
        //simple blocking technique (wait...)
        var waitTill = new Date(new Date().getTime() + seconds * 1000);
        while (waitTill > new Date()) { }
    };


    const connection = await imaps.connect(imapConfig)

    const imapConnect = async () => {

        await connection.openBox('INBOX')

        var searchCriteria = [
            ['NEW'],
            ['HEADER', 'from', 'mail@kcredit.or.kr'],
            ['SINCE', now.toISOString()], // 날짜 기준만 적용 가능, 시간x. now.toISOString() = today()
        ];
        var fetchOptions = { bodies: ['HEADER', 'TEXT', ''], };

        return await connection.search(searchCriteria, fetchOptions)
    };

    const untilNewMailConfirm = async () => {
        while (true) {
            const searchMail = await imapConnect();

            // imap.seach returns an array
            if (searchMail.length > 0) {
                //  NEW Flag로 메시지가 1개라도 있으면 그 uid 읽음 처리 addFlag Callback Sent
                await connection.addFlags(searchMail[0].attributes.uid, ['\\SEEN'], (err) => { if (err) { console.log('addFlage Err', err) } });
                // NEW Flag mail 을 parse Function으로 보내고 untilNewMailConfirm function 종료
                return newMailParse(searchMail[0]);
            }
            // Wait 1 second before checking again
            console.log('NEW 메시지 올때까지 1초마다 sleep and recursively do while function')
            await sleep(1000);
        }
    };

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));



    const newMailParse = async (newMail) => {
        const fullBody = _.find(newMail.parts, { which: '' });
        const parseNewMailBody = await simpleParser(fullBody.body);
        // match는 array 반환
        const authNumber = parseNewMailBody.text.match(/\b\d{6}\b/g, '')[0];
        return authNumber
    };


    const authNumberOut = await untilNewMailConfirm();
    console.log("🚀 ~ file: creditForYou.js:314 ~ authNumberOut", authNumberOut)
    await connection.end();
    console.log('connection end')

    blockingWait(3);

    await page.waitForSelector('#edtAuthNum');

    await page.type('#edtAuthNum', authNumberOut)


    await page.waitForSelector('#btnAuthConfirm');
    await page.evaluate(() => $('#btnAuthConfirm').click())
    console.log('확인 버튼 클릭')
    // await page.waitForNavigation();
    // blockingWait(1);

    await page.waitForSelector('#btnConfirm');
    await page.evaluate(() => $('#btnConfirm').click())
    console.log('다음 버튼 클릭')
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

    // await page.evaluate(() => {
    //     // 보험계약현황 페이지 이동
    //     fn_main_headPageAction(this, '210', 'ins/contStatList.do');
    // });
    // await page.waitForNavigation();


    // const credit4u = [];
    // await page.evaluate(() => {
    //     // 정액형 page
    //     location.href = "/ins/fixedReturn.do"
    // });
    // await page.waitForNavigation();


    

    // fontEnd에서 한 페이지씩 list 가져오기




    // await page.evaluate(() => {
    //     // 기본 '정상' 계약만 조회되있는 거 전체(해지포함) 조회로 바꿈
    //     $('#all_sub')[0].checked = true;    // radio check
    //     fixedReturnList("1");
    // })
    // const xamtResult = await page.evaluate(async () => {
    //     // paging이동은 dom 변수 초기화 안 됨. arr.push해도 이어짐
    //     var insuarance = [];
    //     var count = 1;
    //     const loop = async () => {
    //         while (true) {
    //             count++
    //             fixedReturnList(count);

    //             // $('#item li .box').each 안에서 $(this)는 오직 .box div 만 가르킴
    //             $('#item li .box').each(function (index) {
    //                 const commodity = {}
    //                 commodity['보험사'] = $(this).find('.info_gap').find('.overdue').text(),
    //                     commodity['상품명'] = $(this).find('.info_gap').find('.str_product').text(),
    //                     commodity['상태'] = $(this).find('.info_gap').find('span').text();
    //                 var contract = {}
    //                 $(this).find('.rezult_list').find('ul').find('li').each((index, li) => {
    //                     // 이 안에서의 this도 .box div 임. li 가 아님
    //                     contract[li.textContent.split(':')[0].trim()] = li.textContent.split(':')[1].trim();

    //                 })
    //                 commodity['contract'] = contract
    //                 insuarance.push(commodity)
    //             });

    //             if ($('#divPaging').children().length - 4 == count) {
    //                 return insuarance;
    //             }
    //             await sleep(500);
    //         }
    //     };

    //     const loopResult = await loop()

    //     return loopResult;
    // })

    // credit4u['xamt'] = xamtResult
    // console.log("🚀 ~ file: creditForYou.js:379 ~ credit4u", credit4u)





    // 아니면 그냥 xhr 보내서 network response json data로 일괄 확인 가능
    // const xamtResult = await page.evaluate(() => {
    //     const insContract = {}

    //     return $.ajax({
    //         url: '/ins/ajaxPrintFixedReturn.do',
    //         type: 'post',
    //         data: {
    //             'contractor': 'ALL',
    //             'mcontSttusCd': 'ALL',
    //             'pageIndex': 1,
    //             'pageUseYn': 'false',
    //             'viewCon': 'p'
    //         },
    //         async: false,
    //         beforeSend: function (xhr) {
    //             var header = $("meta[name='_csrf_header']").attr("content");
    //             var token = $("meta[name='_csrf']").attr("content");
    //             xhr.setRequestHeader(header, token);
    //         },
    //         success: function (data) {
    //             //요부분이 전체 계약 세부내역
    //         }
    //     }).responseJSON;
    // });

    // credit4u['xamt'] = xamtResult
    // console.log("🚀 ~ file: creditForYou.js:452 ~ credit4u", credit4u)

    // await page.waitForNavigation();


    // const aliResult = await page.evaluate(() => {
    //     const insContract = {}
    //     // responseJSON.paginationInfo.lastPageNo 랑 responseJSON.paginationInfo.currentPageNo 랑 비교해서
    //     // 같아질때까지 반복
    //     return $.ajax({
    //         url:'/ins/ajaxIndemnityContList.do',
    //         type:'post',
    //         data: {
    //             'pageIndex'		: 1,
    //             'pageUseYn' 	: "true",
    //             'viewCon'		: 'p',
    //         },
    //          async: false,
    //         beforeSend: function( xhr ) {
    //             var header = $("meta[name='_csrf_header']").attr("content");
    //             var token = $("meta[name='_csrf']").attr("content");
    //             xhr.setRequestHeader(header, token);
    //         },
    //         success: function(data){}
    //     }).responseJSON;
    // });

    // credit4u['ali'] = aliResult
    // console.log("🚀 ~ file: creditForYou.js:478 ~ credit4u", credit4u)
    

    // await page.waitForNavigation();



    // const aliPayed = await page.evaluate(() => {
    //     const insContract = {}
    //     // responseJSON.paginationInfo.lastPageNo 랑 responseJSON.paginationInfo.currentPageNo 랑 비교해서
    //     // 같아질때까지 반복
    //     return $.ajax({
    //         url:'/ins/ajaxindemnityClaimList.do',
    //         type:'post',
    //         data: {
    //             'viewCon'		: 'p',
    //             'pageIndex'		: 1,
    //             'pageUseYn' 	: "true",
    //         },
    //         async: false,
    //         beforeSend: function( xhr ) {
    //             var header = $("meta[name='_csrf_header']").attr("content");
    //             var token = $("meta[name='_csrf']").attr("content");
    //             xhr.setRequestHeader(header, token);
    //         },
    //         success: function(data){
    //         }
    //     }).responseJSON;
    // });

    // credit4u['aliPayed'] = aliPayed
    // console.log("🚀 ~ file: creditForYou.js:508 ~ credit4u", credit4u)
    

    // await page.waitForNavigation();

    // const fire = await page.evaluate(() => {
    //     const insContract = {}
    //     // responseJSON.paginationInfo.lastPageNo 랑 responseJSON.paginationInfo.currentPageNo 랑 비교해서
    //     // 같아질때까지 반복
    //     return $.ajax({
    //         url : '/ins/ajaxFireList.do',
    //         type : 'post',
    //         data : {
    //             'contractor' 	: 'ALL',
    //             'mcontSttusCd'	: 'ALL',
    //             'pageIndex'		: 1,
    //             'pageUseYn'		: 'true',
    //             'viewCon'		: 'p',
    //         },
    //         async: false,
    //         beforeSend: function( xhr ) {
    //             var header = $("meta[name='_csrf_header']").attr("content");
    //             var token = $("meta[name='_csrf']").attr("content");
    //             xhr.setRequestHeader(header, token);
    //         },
    //         success : function(data) {}
    //     }).responseJSON;
    // });

    // credit4u['fire'] = fire
    // console.log("🚀 ~ file: creditForYou.js:508 ~ credit4u", credit4u)
    

    // await page.waitForNavigation();


    // const car = await page.evaluate(() => {
    //     const insContract = {}
    //     // responseJSON.paginationInfo.lastPageNo 랑 responseJSON.paginationInfo.currentPageNo 랑 비교해서
    //     // 같아질때까지 반복
    //     return $.ajax({
    //         url : '/ins/ajaxAutomobileList.do',
    //         type : 'post',
    //         data : {
    //             'contractor' 	: 'ALL',
    //             'mcontSttusCd'	: 'ALL',
    //             'pageIndex'		: 1,
    //             'pageUseYn'		: 'true',
    //             'viewCon'		: 'p',
    //         },
    //         async: false,
    //         beforeSend: function( xhr ) {
    //             var header = $("meta[name='_csrf_header']").attr("content");
    //             var token = $("meta[name='_csrf']").attr("content");
    //             xhr.setRequestHeader(header, token);
    //         },
    //         success : function(data) {}
    //     }).responseJSON;
    // });

    // credit4u['car'] = car
    // console.log("🚀 ~ file: creditForYou.js:508 ~ credit4u", credit4u)


    
    const credit4u = await page.evaluate(() => {
        var header = $("meta[name='_csrf_header']").attr("content");
        var token = $("meta[name='_csrf']").attr("content");

        const url = [
            "/ins/ajaxPrintFixedReturn.do",
            "/ins/ajaxIndemnityContList.do",
            "/ins/ajaxindemnityClaimList.do",
            "/ins/ajaxFireList.do",
            "/ins/ajaxAutomobileList.do"
        ];
        const seperator = url.map((url) => url.match(/(?<=\ajax)(.*?)(?=\.do)/g).toString());

        return seperator.map((sep) => {
            return $.ajax({
                url : `/ins/ajax${sep}.do`,
                    type : 'post',
                    data : {
                        'contractor' 	: 'ALL',
                        'mcontSttusCd'	: 'ALL',
                        'pageIndex'		: 1,
                        'pageUseYn'		: 'false',
                        'viewCon'		: 'p',
                    },
                    async: false,
                    beforeSend: function( xhr ) {
                        xhr.setRequestHeader(header, token);
                    }
            }).responseJSON;
        });
    })
    
    console.log("🚀 ~ file: creditForYou.js:601 ~ seperator.map ~ credit4u", credit4u)

    const dayKO = dayjs().format("LL LTS")
  
    const credit4UToFB = {}
    credit4UToFB[dayKO] = {...credit4u};
    console.log("🚀 ~ file: creditForYou.js:611 ~ credit4UToFB", credit4UToFB)
    
    update(startRef, credit4UToFB, {merge: true});
    
    
    // console.timeEnd('회원가입&ins조회')

    const end = performance.now();
    
    const elapsed = end - start;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(0);
    
    console.log(`회원가입 & ins 조회: ${minutes}:${remainingSeconds}`);

    credit4u ? await browser.close()
    : await page.waitForNavigation();

    process.exit();

})();