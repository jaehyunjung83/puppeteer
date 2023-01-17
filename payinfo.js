// const puppeteer = require("puppeteer");
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteerExtraPluginUserAgentOverride from 'puppeteer-extra-plugin-stealth/evasions/user-agent-override/index.js';
import {writeFileSync, appendFileSync} from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import 'dayjs/locale/ko.js'
dayjs.locale('ko')
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
dayjs.extend(localizedFormat);
import download from 'image-downloader';
import {ImageAnnotatorClient} from '@google-cloud/vision';
import {Tabletojson as tabletojson} from 'tabletojson';
const SQLiteMessagesDB = `${process.env.HOME}/Library/Messages/chat.db`;
// const sqlite3 = require('sqlite3').verbose()
import verbose from 'sqlite3';
const sqlite3 = verbose;
import clipboard from 'clipboardy';
import {initializeApp} from 'firebase/app';
import {getDatabase, ref, child, get, onValue, set, update} from 'firebase/database';

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

(async () => {
  const readText0 = clipboard.readSync();
  console.log('🚀 ~ file: payinfo.js ~ line 51 ~ readText0', readText0);

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
    while (waitTill > new Date()) {}
  };

  const navigationPromise = page.waitForNavigation();

  await page.goto('https://payinfo.or.kr/', {
    waitUntil: 'networkidle0',
  });

  page.on('dialog', (dialog) => {
    console.log('page dialog', dialog.message());
    dialog.dismiss();
  });

  const client = await page.target().createCDPSession();
  const cookies = (await client.send('Network.getAllCookies')).cookies;

  const sendCookieConfig = {
    method: 'post',
    url: 'http://localhost:3007/qryAcntSummaryList',
    headers: {
      Cookie: cookies,
    },
  };

  await client.send('Network.setCacheDisabled', {
    cacheDisabled: true,
  });

  // await axios(sendCookieConfig).then((res) => console.log('axios res: ', res)).catch((err) => console.log(err))

  // await page.setViewport({ width: 1080, height: 1080 });
  // console.log('🚀 ~ file: payinfo.js ~ line 60 ~ page', page.frames());

  const [, , secondStartFrame] = await page.frames();

  // const testCaptureImg = await secondStartFrame.waitForSelector(
  //   '#wrap > div.main_container > div.quick_menu > ul > li.quick_m04 > a > img',
  // );

  // await testCaptureImg.click({ button: "right" })

  // await secondStartFrame.keyboard.type('g')

  // await secondStartFrame.keyboard.press('Enter')

  // const img = await testCaptureImg.screenshot({
  //   path: './test.png',
  // });

  // await secondStartFrame.waitForSelector('#gnb > li:nth-child(1) > a');
  // await secondStartFrame.click('#gnb > li:nth-child(1) > a');

  await secondStartFrame.evaluate(() => location.href="/acntcb/qryAcntSummary.do?menu=1&t=123728");
  

  await secondStartFrame.waitForNavigation();

  // console.log('page.frames()', page.frames());

  const [, , , , , mainFrame] = page.frames();
  // await mainFrame.waitForNavigation();

  await mainFrame.waitForNavigation();

  await mainFrame.evaluate(xInjection);
  await mainFrame.waitForSelector('#r_chk_all', {waitUntil: 'load'});
  // await mainFrame.click('#r_chk_all');
  await mainFrame.evaluate(() => $x('//input[contains(@name, "r_chk_all")]').click());

  await mainFrame.waitForSelector('#contents > div.btn_group2 > a');
  await mainFrame.click('#contents > div.btn_group2 > a');

  // console.log('frames', page.frames());

  await mainFrame.waitForSelector('#rlnmNum1', {waitUntil: 'load'});
  await mainFrame.click('#rlnmNum1');
  await mainFrame.type('#rlnmNum1', '831206');

  await mainFrame.waitForSelector('#rlnmNum2', {waitUntil: 'load'});
  await mainFrame.click('#rlnmNum2');

  await mainFrame.waitForSelector('#nppfs-keypad-rlnmNum2 > div', {waitUntil: 'load'});
  await mainFrame.evaluate(() => {
    frmMain1.installed.value = 'T';
    frmMain1.certiKind.value = 'f';
    console.log('frmMain1.installed.value: ', frmMain1.installed.value);
    // yessignInstall.js "인증서 관련 환경 아니다.." 오류 없애게
    // isSupported() false이면 500900입력하고 휴대폰 인증으로 안 넘어가고 다시 agree화면으로 back
    npAddon.isSupported = function () {
      return true;
    };

    console.log('isSupported: ', npAddon.isSupported());

    // npPfsStartup(document.Frm1, true, true, false, true, "enc", "on");

    const touchEnButton1 = Object.values(window.npVCtrl.keypadObject[0]._keypaditems[0].buttons)[4].action;
    const touchEnButton2 = Object.values(window.npVCtrl.keypadObject[0]._keypaditems[0].buttons)[5].action;
    const touchEnButton3 = Object.values(window.npVCtrl.keypadObject[0]._keypaditems[0].buttons)[6].action;
    const touchEnButton4 = Object.values(window.npVCtrl.keypadObject[0]._keypaditems[0].buttons)[7].action;
    const touchEnButton5 = Object.values(window.npVCtrl.keypadObject[0]._keypaditems[0].buttons)[8].action;
    const touchEnButton6 = Object.values(window.npVCtrl.keypadObject[0]._keypaditems[0].buttons)[9].action;
    const touchEnButton7 = Object.values(window.npVCtrl.keypadObject[0]._keypaditems[0].buttons)[10].action;
    const touchEnButton8 = Object.values(window.npVCtrl.keypadObject[0]._keypaditems[0].buttons)[11].action;
    const touchEnButton9 = Object.values(window.npVCtrl.keypadObject[0]._keypaditems[0].buttons)[12].action;
    const touchEnButton0 = Object.values(window.npVCtrl.keypadObject[0]._keypaditems[0].buttons)[13].action;
    const touchEnButtonConfirm = Object.values(window.npVCtrl.keypadObject[0]._keypaditems[0].buttons).find(
      e => e.action == 'action:enter',
    ).action;

    $(`img[data-action="${touchEnButton1}"]`).click().keyup(); //  주민번호 TouchEnKey 창에서 data-action attr이 'data:211ca898b2bf92e503367b090adce492eafc8f41:1'인 element를 찾아 클릭한다.
    $(`img[data-action="${touchEnButton0}"]`).click().keyup();
    $(`img[data-action="${touchEnButton0}"]`).click().keyup();
    $(`img[data-action="${touchEnButton1}"]`).click().keyup();
    $(`img[data-action="${touchEnButton7}"]`).click().keyup();
    $(`img[data-action="${touchEnButton2}"]`).click().keyup();
    $(`img[data-action="${touchEnButton2}"]`).click().keyup();
    $(`img[data-action="${touchEnButtonConfirm}"]`).click();

    console.log('jumin2 hash value', npVCtrl.keypadObject[0]._hashelement[0].value);
  });

  await mainFrame.evaluate(() => {
    console.log(frmMain1.rlnmNum.value);
  });

  // await mainFrame.waitForSelector('#contents > div > div > div:nth-child(4) > div > a:nth-child(2)')
  // await mainFrame.click('#contents > div > div > div:nth-child(4) > div > a:nth-child(2)')

  await mainFrame.evaluate(() =>
    // window.signFin(frmMain1, frmMain1.rlnmNum.value , OID4Personal, null, null, '01')
    OnSearch('f'),
  );

  // console.log('YESKEY 화면 뜬  후', page.frames());

  const iFrame = await mainFrame.waitForSelector('#finCertSdkIframe', {waitUntil: 'load'});

  // const finCertSdkIframe = await page.frames().find(frame => frame.childFrames()[0]);
  // // console.log("🚀 ~ file: payinfo.js ~ line 165 ~ finCertSdkIframe", finCertSdkIframe)

  // await mainFrame.waitForNavigation();
  const finCertSdkIframe = await iFrame.contentFrame();

  await finCertSdkIframe.waitForSelector('#CLOUD_ID_1', {waitUntil: 'load'});

  const getPubKeyIdRes = {};
  const isDeviceInitial = await finCertSdkIframe.evaluate(
    async getPubKeyIdRes => await finCertClient.main.getPubKeyId().then(res => (getPubKeyIdRes = res)),
  );

  await finCertSdkIframe.waitForSelector('#CLOUD_ID_1', {waitUntil: 'load'});
  await finCertSdkIframe.click('#CLOUD_ID_1');
  await finCertSdkIframe.type('#CLOUD_ID_1', '정재현');
  await finCertSdkIframe.waitForTimeout(300);
  await finCertSdkIframe.waitForSelector('#CLOUD_ID_2', {waitUntil: 'load'});
  await finCertSdkIframe.click('#CLOUD_ID_2');
  await finCertSdkIframe.type('#CLOUD_ID_2', '01088957500');
  await finCertSdkIframe.waitForTimeout(300);
  await finCertSdkIframe.waitForSelector('#CLOUD_ID_3', {waitUntil: 'load'});
  await finCertSdkIframe.click('#CLOUD_ID_3');
  await finCertSdkIframe.type('#CLOUD_ID_3', '19831206');
  await finCertSdkIframe.waitForTimeout(300);
  // await finCertSdkIframe.waitForSelector('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.checkbox_pack > label > span.checkbox_shape', { waitUntil: 'load'})
  // await finCertSdkIframe.click('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.checkbox_pack > label > span.checkbox_shape')
  await finCertSdkIframe.waitForSelector(
    '#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.login_confirm_wrap > button',
  );
  await finCertSdkIframe.click(
    '#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.login_confirm_wrap > button',
  );

  await finCertSdkIframe.waitForSelector(
    '#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.code_info_area',
  );

  const twoNumber = await finCertSdkIframe.evaluate(() => {
    // puppeteer text -> mac client[clipboard]
    // 화면에 표시된 인증 2자리 숫자를 browser clipboard에 넣어서 mac client clipboard에서도 동시에 접근 paste 할 수 있도록
    const yeskey = $(
      '#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.code_info_area > div.code_confirm_number',
    )[0].textContent;

    navigator.clipboard.writeText(yeskey);
    return yeskey;
  });
  console.log('🚀 ~ file: payinfo.js ~ line 295 ~ twoNumber ~ twoNumber', twoNumber);

  // 핸드폰 YesKey인증 번호 문자 발송 후
  await finCertSdkIframe.waitForSelector(
    '#__fincert_root__ > div > div > div.cf_layer_pagepop.wai_show.active > div > div.lp_container.key_layer > div > div.password_input_area > div',
  );

  await mainFrame.evaluate(() => {
    console.log('frmMain1.rlnmNum1.value: ', frmMain1.rlnmNum1.value);
    console.log('frmMain1.rlnmNum2.value: ', frmMain1.rlnmNum2.value);
    // frmMain1.rlnmNum.value = frmMain1.rlnmNum1.value + '1111111'
    console.log('frmMain1.rlnmNum.value: ', frmMain1.rlnmNum.value);
    console.log('jumin2 hash value', npVCtrl.keypadObject[0]._hashelement[0].value);
  });

  await finCertSdkIframe.evaluate(() => {
    // 중요!! finCertSdkIframe(about:black) frame에서!! 금융인증서 hash별 버튼 label
    const button0 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find(e => e.label == 0).action;
    const button1 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find(e => e.label == 1).action;
    const button2 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find(e => e.label == 2).action;
    const button3 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find(e => e.label == 3).action;
    const button4 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find(e => e.label == 4).action;
    const button5 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find(e => e.label == 5).action; // 'data:p53:p53'
    const button6 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find(e => e.label == 6).action;
    const button7 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find(e => e.label == 7).action;
    const button8 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find(e => e.label == 8).action;
    const button9 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find(e => e.label == 9).action;

    $(`img[data-action="${button5}"]`).click().keyup(); //  금융인증서 창에서 data-action attr이 data:p53:p53인 element를 찾아 클릭한다.
    $(`img[data-action="${button0}"]`).click().keyup();
    $(`img[data-action="${button0}"]`).click().keyup();
    $(`img[data-action="${button9}"]`).click().keyup();
    $(`img[data-action="${button0}"]`).click().keyup();
    $(`img[data-action="${button0}"]`).click().keyup();
  });

  // console.log('5009입력 후 frames', page.frames());

  const [, , , , , frameset] = page.frames();
  await frameset.evaluate(() => {
    console.log(document.location);
  });

  await frameset.waitForSelector('#contents > div > a > div > span', {waitUntil: 'load'});
  await frameset.click('#contents > div > a > div > span');

  await frameset.waitForNavigation();

  

  var count = 0;
  const captchaByLens = async () => {

    while (true) {
      count++
      var captchaSolveText = '';
      count == 1 ? console.log('--lens 캡챠solve시작--') : console.log(`--lens 오류 ${count} 번째 재실행--`);

      await page.bringToFront();
      const captchaImg = await frameset.waitForSelector('#catpcha > img');
      console.log("🚀 ~ file: payinfo.js ~ line 383 ~ captchaByLens ~ captchaImg", captchaImg)

      await frameset.waitForFunction(() => {
        const img = $('#catpcha > img')[0]
        return img.width > 0
      },{timeout:0})

      
      await captchaImg.screenshot({path: './payinfoCaptchaImg.png',});
      

      const fileName = './payinfoCaptchaImg.png';

      // Performs text detection by Lens

      const pages = await browser.pages();
      console.log('page2: ', pages[pages.length - 1]);

      const page2 = pages.length > 2 ? pages[pages.length - 1] : await browser.newPage();

      pages.length > 2
        ? null
        : await page2.goto('https://bit.ly/glensocr', {
            waitUntil: 'networkidle0',
          });
      // console.log('page2: ', pages[pages.length - 1]);
      
      await page2.bringToFront();

      blockingWait(0.3);

      await page2.evaluate(xInjection);

      // await page2.waitForNavigation();


      // const nCexist = async () => {
      //   const upload = await page2.evaluate(() => $x('//span[contains(text(), "Upload")]'));
      //   upload
      //     ? await page2.evaluate(
      //         () =>
      //           ($x('//span[contains(text(), "Upload")]').length = 1
      //             ? $x('//span[contains(text(), "Upload")]').click()
      //             : $x('//span[contains(text(), "Upload")]')),
      //       )
      //     : await page2.waitForNavigation();
      // };
      // await nCexist();

      await page2.waitForXPath('//span[contains(text(), "Upload")]');
      await page2.evaluate(() => $x('//span[contains(text(), "Upload")]').click());
      

      await page2.waitForXPath('//span[.="Computer"]');
      console.log('Computer');
      
      // await page2.waitForResponse(res => res);

      const [fileChooser] = await Promise.all([
        page2.waitForFileChooser(),
        page2.evaluate(() => $x('//span[.="Computer"]').click()),
      ]);
      // await page2.waitForResponse(res => res);

      await fileChooser.accept([fileName]);
      console.log(`${fileName} Uploaded!`);
      
      // await page2.waitForNavigation();
      

      // await page2.waitForResponse(res => {return res.remoteAddress === '142.250.196.142:443'})
      
      await page2.waitForResponse(res => {
        return res.url().includes('play.google.com');
      });



      // 모서리 받침 부분이 화면에 그려지면 Text button click 하게
      await page2.waitForFunction(() => {
        return $x('//input[contains(@data-corner-type, "1")]').clientWidth > 0;
      });
      console.log('모서리 확인')

      await page2.waitForXPath('//button[contains(@aria-label, "Switch to Text mode")]');

      // await page2.waitForNavigation({waitUntil: 'networkidle0'});

      await page2.evaluate(() => 
        $x('//button[contains(@aria-label, "Switch to Text mode")]').click()
      );
        // blockingWait(1);

      console.log('Text Button Click()');

      await page2.waitForResponse(res => {
        return res.url().includes('batchexecute');
      });

      await page2.waitForXPath('//span[.="Select all text"]');
      await page2.evaluate(() => $x('//span[.="Select all text"]').click());

      await page2.waitForFunction(() => {
        const textReadDiv = $x('//div[contains(@jsname, "r4nke")]').innerText
      return textReadDiv.length > 0
      },{timeout: 0},)
    

      console.log('Select all text');


      const lensResultText = await page2.evaluate(() => {
        return $x('//div[starts-with(@jsaction, "contextmenu")]').innerText;
      });
      console.log('🚀 ~ file: payinfo.js ~ line 479 ~ lensResultText ~ lensResultText', lensResultText);

      // 특수문자만 regex
      const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
      // 특수문자 만 제외하고 숫자만 남김
      const refinedResult = lensResultText.replace(reg, '');

      await page.bringToFront();
      blockingWait(0.3);


      await frameset.waitForSelector('#answer', {waitUntil: 'load'});
      await frameset.type('#answer', refinedResult);
      captchaSolveText = refinedResult;
      await frameset.click('#frmSubmit');
      const resultOKorNot = await frameset.$eval('#resultImg', el => (el.value === 'ok' ? true : false));
      console.log('🚀 ~ file: payinfo.js ~ line 377 ~ captchaByLens ~ resultOKorNot', resultOKorNot);

      if (resultOKorNot) { 
        return await page2.close() 
      } else { 
            await page.bringToFront();
            blockingWait(0.3);
            await frameset.click('#reLoad');
          }
      
      };
  };



  try {
    const solvedCaptcha = await captchaByLens();
    console.log('🚀 ~ file: payinfo.js ~ line 395 ~ solvedCaptcha', solvedCaptcha);
  } catch {
      await page.bringToFront();
      blockingWait(0.3);
      await frameset.click('#reLoad');
      await captchaByLens();
  }

  console.log('captcha 끝내고 은행 핸드폰번호 입력 ');
  
  await frameset.evaluate(() => {
    $('#fncOrgCode > option:nth-child(2)').prop('selected', true);
    console.log('하나은행 option 선택');
  });

  blockingWait(0.2);

  await frameset.evaluate(() => {
    $('#cellNum').val('01088957500');
    console.log("$('cellNum').value: ", $('cellNum').value);
  });

  await frameset.waitForSelector(
    '#contents > div.section > div.tbl_list_inquiry3.mg_b50 > table > tbody > tr:nth-child(2) > td > form > p.pd_b15.wrapSty1 > a',
    {waitUntil: 'load'},
  );
  await frameset.click(
    '#contents > div.section > div.tbl_list_inquiry3.mg_b50 > table > tbody > tr:nth-child(2) > td > form > p.pd_b15.wrapSty1 > a',
  );

  await frameset.waitForNavigation();

  await frameset.waitForSelector('#smsNum');

  var nowTime = new Date();
  nowTime.setHours(nowTime.getHours() + 9);
  const sentTimeISO = nowTime.toISOString().replace('T', ' ').substring(0, 19);

  const db = new sqlite3.Database(SQLiteMessagesDB);

  let sql = `
    SELECT
        datetime (message.date / 1000000000 + strftime ("%s", "2001-01-01"), "unixepoch", "localtime") AS message_date,
        message.text
    FROM
        chat
        JOIN chat_message_join ON chat. "ROWID" = chat_message_join.chat_id
        JOIN message ON chat_message_join.message_id = message. "ROWID"
    WHERE
        chat_identifier = '+82220338500'
        and
        datetime (message.date / 1000000000 + strftime ("%s", "2001-01-01"), "unixepoch", "localtime") > '${sentTimeISO}'
    ORDER BY message_date DESC
    `;

  let messageresult = {};
  const get = async () => {
    db.get(sql, [], (err, row) => {
      if (err) {
        throw err;
      }
      if (row) {
        return (messageresult = row), resultOut(messageresult);
      } else {
        return setTimeout(() => {
          get(), console.log('메시지 올때까지 1초마다 db read');
        }, 1000);
      }
    });
  };
  get();


  const resultOut = async resultOutReturn => {
    console.log('resultOutReturn: ', resultOutReturn),
      // 문자+숫자 => 숫자가 아닌 건 지워라
      await frameset.type('#smsNum', resultOutReturn.text.replace(/[^0-9]/g, ''));
  };

  await frameset.waitForFunction(() => {
      const smsConfirmNum = document.getElementById('smsNum').value;

      return smsConfirmNum.length == 6;
    },
    {timeout: 0},
  );

  await frameset.waitForSelector(
    '#contents > div.section > div.tbl_list_inquiry3.mg_b50 > table > tbody > tr:nth-child(2) > td > form > p:nth-child(2) > a',
  );
  await frameset.click(
    '#contents > div.section > div.tbl_list_inquiry3.mg_b50 > table > tbody > tr:nth-child(2) > td > form > p:nth-child(2) > a',
  );
  // await frameset.evaluate(() => {
  //   OnCheckNum();
  // })

  // await frameset.waitForSelector('#smsNum');

  await frameset.waitForNavigation();

  await frameset.waitForSelector('#btn_inqr');
  await frameset.click('#btn_inqr');
  // await frameset.evaluate(() => {
  //   OnNext();
  // })

  // const f = await page.$("frame[name='mainFrame']")
  // //  console.log("🚀 ~ file: payinfo.js ~ line 535 ~ f", f)
  //  const x = await f.contentFrame();
  //  const n = await x.$("txt_link")
  // //  console.log("🚀 ~ file: payinfo.js ~ line 539 ~ n", n)

  await frameset.waitForNavigation();

  const qryAcntSum = await frameset.content();
  // fs.writeFileSync('qryAcntSum.html', qryAcntSum);

  // const html = fs.readFileSync(path.resolve(__dirname, 'qryAcntSum.html'), {encoding: 'UTF-8'});
  // const converted = tabletojson.convert(qryAcntSum);
  // writeFileSync('convertedWhole.json', JSON.stringify(converted));

  const payinfo = [];

  // 은행권
  const bankWholeObj = await frameset.evaluate(() => {
    var cols = [];
    var bankresult = [];
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2.stripes > table > thead > tr > th ').each(function () {
      cols.push($(this).text().replaceAll(/\t|\n|\s/g, ""));
    });
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2.stripes > table > tbody > tr').each(function (id) {
      var row = {id: id + 1};
      $(this)
        .find('td')
        .each(function (index) {
          if (index > 0 && index < 7) {
            row[cols[index] + '_비활동'] = $(this).find('p:eq(0)').text().replaceAll(/\t|\n|\s/g, "");
            row[cols[index] + '_활동'] = $(this).find('p:eq(1)').text().replaceAll(/\t|\n|\s/g, "");
          } else {
            row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
          }
        });
      bankresult.push(row);
    });
    return bankresult;
  });
  console.log('🚀 ~ file: payinfo.js ~ line 513 ~ bankWholeObj ~ bankWholeObj', bankWholeObj);
  payinfo['bankWhole'] = bankWholeObj;
  console.log('🚀 ~ file: payinfo.js ~ line 626 ~ bankWholeObj', payinfo);
  const bankDetailLength = await frameset.$$eval('a.btn_policy', button => button.length);

  // const detail = {}

  for (let i = 0; i < bankDetailLength; i++) {
    await frameset.$$eval('a.btn_policy', (button, i) => button[i].click(), i);

    // console.log(page.frames())

    await frameset.waitForNavigation();
    await frameset.waitForSelector('#contents > div:nth-child(3) > div.btn_group > a:nth-child(2)');

    await frameset.evaluate(xInjection);

    const bankDetailObj = await frameset.evaluate(() => {
      var cols = [];
      var bankDetailResult = {activated: [], deactivated: []};

      const getXPathFromElement = element => {
        const idx = (sib, name) =>
          sib ? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName == name) : 1;
        const segs = elm =>
          !elm || elm.nodeType !== 1
            ? ['']
            : elm.id && document.getElementById(elm.id) === elm
            ? [`id("${elm.id}")`]
            : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
        return segs(element).join('/');
      };

      const activateAcc = $x('//p[.="활동성계좌"]');
      console.log('🚀 ~ file: payinfo.js ~ line 677 ~ bankDetailObj ~ activateAcc', activateAcc);
      const actAccPath = activateAcc ? getXPathFromElement(activateAcc) : undefined;
      // const nonActivateAcc = $x('//p[.="비활동성계좌"]');
      // const nonActAccPath = nonActivateAcc ? getXPathFromElement(nonActivateAcc[0]) : undefined;

      // debugger

      // 활성계좌가로줄이 있는 tr은 xpath의 6번째에 있음
      const actAccTr = actAccPath ? actAccPath.split('/')[6] : undefined;
      const actAccNumberIndex =
        actAccTr?.match(/[0-9]/g).length > 1 ? actAccTr?.match(/[0-9]{2}/)[0] : actAccTr?.match(/[0-9]{1}/)[0];
      // 비활성계좌가로줄이 있는 tr은 xpath의 6번째에 있음
      // const nonActAccTr = nonActAccPath.split('/')[6];
      // const nonActAccNumberIndex =
      //   nonActAccTr?.match(/[0-9]/g).length > 1 ? nonActAccTr?.match(/[0-9]{2}/)[0] : nonActAccTr?.match(/[0-9]{1}/)[0];

      $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > thead > tr > th').each(function (index) {
        $(this).find('p').length > 0
          ? cols.push($(this).find('p:eq(0)').text().replaceAll(/\t|\n|\s/g, "")) +
            cols.push($(this).find('p:eq(1)').text().replaceAll(/\t|\n|\s/g, ""))
          : $(this).text() == ''
          ? cols.push('개설일순번')
          : cols.push($(this).text().replaceAll(/\t|\n|\s/g, ""));
      });
      $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
        var row = {};
        $(this)
          .find('td')
          .each(function (index) {
            if (index == 0) {
              //구분번호
              row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            } else if (index == 4) {
              //잔고
              row[cols[7]] = Number(
                $(this).text().replaceAll(',', '').replaceAll(/\t|\n|\s/g, ""),
              );
            } else if (index == 7) {
              //오픈뱅킹등록여부
              row[cols[12]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            } else if (index == 8) {
              //계좌해지잔고이전
              row[cols[13]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            } else {
              if (index < 5) {
                row[cols[index * 2 - 1]] = $(this)
                  .find('p:eq(0)')
                  .text()
                  .replaceAll(/\t|\n|\s/g, "")
                  ;
                row[cols[index * 2]] = $(this).find('p:eq(1)').text().replaceAll(/\t|\n|\s/g, "");
              } else {
                row[cols[index * 2 - 2]] = $(this)
                  .find('p:eq(0)')
                  .text()
                  .replaceAll(/\t|\n|\s/g, "")
                  ;
                row[cols[index * 2 - 1]] = $(this)
                  .find('p:eq(1)')
                  .text()
                  .replaceAll(/\t|\n|\s/g, "")
                  ;
              }
            }
          });

        actAccNumberIndex == undefined || id < actAccNumberIndex - 1
          ? bankDetailResult.deactivated.push(row)
          : bankDetailResult.activated.push(row);
      });

      bankDetailResult.활동성계좌위치 = actAccNumberIndex ?? 'undefined';

      bankDetailResult.합계 = Number(
        $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tfoot > tr > td')
          .text()
          .replace(/[^0-9]/g, ''),
      );

      Object.keys(bankDetailResult).forEach(key => {
        if (bankDetailResult[key].length == 0) {
          delete bankDetailResult[key];
        }
      });

      return bankDetailResult;
    });
    console.log('🚀 ~ file: payinfo.js ~ line 568 ~ bankDetailObj ~ bankDetailObj', bankDetailObj);
    payinfo.bankWhole[i]['bankDetail'] = bankDetailObj;
    console.log('🚀 ~ file: payinfo.js ~ line 689 ~ payinfo', payinfo);

    // i == 0
    //   ? writeFileSync('detail.json', JSON.stringify(detailJson))
    //   : appendFileSync('detail.json', ',' + JSON.stringify(detailJson));

    await frameset.click('#contents > div:nth-child(3) > div.btn_group > a:nth-child(2)');

    await frameset.waitForNavigation();
  }

  // 2금융권(저축은행, 우체국)
  await frameset.click('#lnb > li:nth-child(2) > a');

  await frameset.waitForNavigation();

  const secondTeerObj = await frameset.evaluate(() => {
    var cols = [];
    var secondTeerResult = [];

    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2.stripes > table > thead > tr > th').each(function (index) {
      cols.push($(this).text().replaceAll(/\t|\n|\s/g, ""));
    });
    console.log('2nd Teer Whole cols: ', cols);
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
      var row = {id: id + 1};
      $(this)
        .find('td')
        .each(function (index) {
          if (index > 0 && index < 5) {
            row[cols[index] + '_비활동'] = $(this).find('p:eq(0)').text().replaceAll(/\t|\n|\s/g, "");
            row[cols[index] + '_활동'] = $(this).find('p:eq(1)').text().replaceAll(/\t|\n|\s/g, "");
          } else {
            row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
          }
        });
      secondTeerResult.push(row);
    });

    return secondTeerResult;
  });

  console.log('secondTeerObj: ', secondTeerObj);
  payinfo['secondTeer'] = secondTeerObj;
  console.log('🚀 ~ file: payinfo.js ~ line 733 ~ payinfo', payinfo);

  const readText = clipboard.readSync();
  console.log('🚀 ~ file: payinfo.js ~ line 638 ~ readText', readText);

  const secondTeerdetailLength = await frameset.$$eval('a.btn_policy', button => button.length);
  console.log('🚀 ~ file: payinfo.js ~ line 630 ~ secondTeerdetailLength', secondTeerdetailLength);
  const secondTeerdetailButtons = await frameset.$$eval('a.btn_policy', buttons => buttons);
  console.log('🚀 ~ file: payinfo.js ~ line 632 ~ secondTeerdetailButtons', secondTeerdetailButtons);

  // const detail = {}

  for (let i = 0; i < secondTeerdetailLength; i++) {
    await frameset.$$eval('a.btn_policy', (button, i) => button[i].click(), i);

    // console.log(page.frames())

    await frameset.waitForNavigation();
    await frameset.waitForSelector('#contents > div:nth-child(3) > div.btn_group > a:nth-child(2)');

    await frameset.evaluate(xInjection);

    const secondTeerDetailView = await frameset.content();

    await frameset.waitForSelector('#contents > div:nth-child(3) > div.btn_group > a:nth-child(2)');

    // writeFileSync(`SecondTeerDetail_${i}.html`, secondTeerDetailView);

    // const secondTeerDetailJson = tabletojson.convert(secondTeerDetailView);

    const secondTeerDetailObj = await frameset.evaluate(() => {
      const getXPathFromElement = element => {
        const idx = (sib, name) =>
          sib ? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName == name) : 1;
        const segs = elm =>
          !elm || elm.nodeType !== 1
            ? ['']
            : elm.id && document.getElementById(elm.id) === elm
            ? [`id("${elm.id}")`]
            : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
        return segs(element).join('/');
      };

      const activateAcc = $x('//p[.="활동성계좌"]');
      console.log('🚀 ~ file: payinfo.js ~ line 677 ~ bankDetailObj ~ activateAcc', activateAcc);
      const actAccPath = activateAcc ? getXPathFromElement(activateAcc) : undefined;

      // 활성계좌가로줄이 있는 tr은 xpath의 6번째에 있음
      const actAccTr = actAccPath ? actAccPath.split('/')[6] : undefined;
      const actAccNumberIndex =
        actAccTr?.match(/[0-9]/g).length > 1 ? actAccTr?.match(/[0-9]{2}/)[0] : actAccTr?.match(/[0-9]{1}/)[0];

      var cols = [];
      var secondTeerDetailResult = {activated: [], deactivated: []};

      $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > thead > tr > th').each(function (index) {
        $(this).find('a').remove();
        $(this).find('p').length > 0
          ? cols.push($(this).find('p.tit:eq(0)').text()) + cols.push($(this).find('p.tit2').text())
          : $(this).text() == ''
          ? cols.push('개설일순번')
          : cols.push($(this).text());
      });
      console.log('2nd Teer cols: ', cols);
      $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
        var row = {};
        $(this)
          .find('td')
          .each(function (index) {
            if (index == 0) {
              //구분번호
              row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            } else if (index == 4) {
              //잔고
              row[cols[7]] = Number(
                $(this).text().replaceAll(',', '').replaceAll(/\t|\n|\s/g, ""),
              );
            } else if (index == 7) {
              //오픈뱅킹등록여부
              row[cols[12]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            } else if (index == 8) {
              //계좌해지잔고이전
              row[cols[13]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            } else {
              if (index < 5) {
                row[cols[index * 2 - 1]] = $(this)
                  .find('p:eq(0)')
                  .text()
                  .replaceAll(/\t|\n|\s/g, "")
                  ;
                row[cols[index * 2]] = $(this).find('p:eq(1)').text().replaceAll(/\t|\n|\s/g, "");
              } else {
                row[cols[index * 2 - 2]] = $(this)
                  .find('p:eq(0)')
                  .text()
                  .replaceAll(/\t|\n|\s/g, "")
                  ;
                row[cols[index * 2 - 1]] = $(this)
                  .find('p:eq(1)')
                  .text()
                  .replaceAll(/\t|\n|\s/g, "")
                  ;
              }
            }
          });

        actAccNumberIndex == undefined || id < actAccNumberIndex - 1
          ? secondTeerDetailResult.deactivated.push(row)
          : secondTeerDetailResult.activated.push(row);
      });

      secondTeerDetailResult.활동성계좌위치 = actAccNumberIndex ?? 'undefined';

      secondTeerDetailResult.합계 = Number(
        $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tfoot > tr > td')
          .text()
          .replace(/[^0-9]/g, '')
      );

      Object.keys(secondTeerDetailResult).forEach(key => {
        if (secondTeerDetailResult[key].length == 0) {
          delete secondTeerDetailResult[key];
        }
      });

      return secondTeerDetailResult;
    });
    console.log('🚀 ~ file: payinfo.js ~ line 568 ~ secondTeerDetailObj ~ secondTeerDetailObj', secondTeerDetailObj);

    payinfo.secondTeer[i]['2ndTeerDetail'] = secondTeerDetailObj;
    console.log('🚀 ~ file: payinfo.js ~ line 810 ~ payinfo', payinfo);

    // i == 0
    //   ? writeFileSync('detail.json', JSON.stringify(secondTeerDetailJson))
    //   : payinfo[`secondTeerDetail${i}`] = secondTeerDetailResult;

    await frameset.click('#contents > div:nth-child(3) > div.btn_group > a:nth-child(2)');

    await frameset.waitForNavigation();
  }

  console.log('저축은행 obj 완료');




  // 증권사
  // await frameset.waitForSelector('#lnb > li:nth-child(3) > a');
  // await frameset.click('#lnb > li:nth-child(3) > a');

  await frameset.evaluate(() => { location.href="/acntcb/qryAcntStockSummary.do?menu=5&t=214327"})

  await frameset.waitForSelector('#confirm');
  
  await frameset.evaluate(() => {
    $('#confirm')[0].checked = true;
    OnSearch();
  })

  // await frameset.evaluate(() => {
  //   $('#confirm_paystop')[0].checked = true;
  //   OnSearch();
  // });
  // await frameset.waitForNavigation();

  // await frameset.evaluate(() => {
  //   $('#confirm')[0].checked = true;
  //   OnSearch();
  // });


  // await frameset.click('#contents > div > div.btn_group2 > a');

  await frameset.waitForNavigation();

  const securitiesObj = await frameset.evaluate(() => {
    var cols = [];
    var securitiesResult = [];

    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2.stripes > table > thead > tr > th').each(function (index) {
      cols.push($(this).text().replaceAll(/\t|\n|\s/g, ""));
    });
    console.log('cols: ', cols);
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
      var row = {id: id + 1};
      $(this)
        .find('td')
        .each(function (index) {
          if (index > 0 && index < 3) {
            row[cols[index] + '_비활동'] = $(this).find('p:eq(0)').text().replaceAll(/\t|\n|\s/g, "");
            row[cols[index] + '_활동'] = $(this).find('p:eq(1)').text().replaceAll(/\t|\n|\s/g, "");
          } else {
            row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
          }
        });
      securitiesResult.push(row);
    });

    return securitiesResult;
  });

  console.log('securitiesObjObj: ', securitiesObj);
  payinfo['securities'] = securitiesObj;
  console.log('🚀 ~ file: payinfo.js ~ line 860 ~ payinfo', payinfo);

  const securitiesDetailLength = await frameset.$$eval('a.btn_policy', button => button.length);
  const securitiesDetailButtons = await frameset.$$eval('a.btn_policy', buttons => buttons);
  console.log('🚀 ~ file: payinfo.js ~ line 494 ~ securitiesDetailButtons', securitiesDetailButtons);
  console.log('🚀 ~ file: payinfo.js ~ line 400 ~ securitiesDetailLength', securitiesDetailLength);

  // const detail = {}

  for (let i = 0; i < securitiesDetailLength; i++) {
    await frameset.$$eval('a.btn_policy', (button, i) => button[i].click(), i);

    // console.log(page.frames())

    await frameset.waitForNavigation();
    await frameset.waitForSelector('#checkForm > div > a:nth-child(2)');

    await frameset.evaluate(xInjection);

    const detailView = await frameset.content();

    await frameset.waitForSelector('#checkForm > div > a:nth-child(2)');

    // writeFileSync(`detail_${i}.html`, detailView);

    // const detailJson = tabletojson.convert(detailView);

    const securitiesDetailObj = await frameset.evaluate(() => {

      const getXPathFromElement = element => {
        const idx = (sib, name) =>
          sib ? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName == name) : 1;
        const segs = elm =>
          !elm || elm.nodeType !== 1
            ? ['']
            : elm.id && document.getElementById(elm.id) === elm
            ? [`id("${elm.id}")`]
            : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
        return segs(element).join('/');
      };

      const activateAcc = $x('//p[.="활동성계좌"]');
      console.log('🚀 ~ file: payinfo.js ~ line 677 ~ bankDetailObj ~ activateAcc', activateAcc);
      const actAccPath = activateAcc ? getXPathFromElement(activateAcc) : undefined;

      // 활성계좌가로줄이 있는 tr은 xpath의 6번째에 있음
      const actAccTr = actAccPath ? actAccPath.split('/')[6] : undefined;
      const actAccNumberIndex =
        actAccTr?.match(/[0-9]/g).length > 1 ? actAccTr?.match(/[0-9]{2}/)[0] : actAccTr?.match(/[0-9]{1}/)[0];


      var cols = [];
      var securitiesDetailResult = {activated: [], deactivated: []};
      

      $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > thead > tr > th').each(function (index) {
        $(this).find('a').remove();
        $(this).find('p').length > 0
          ? cols.push($(this).find('p.tit:eq(0)').text()) + cols.push($(this).find('p.tit2').text())
          : $(this).text() == ''
          ? cols.push('개설일순번')
          : cols.push($(this).text());
      });
      console.log('증권사 cols: ', cols);
      $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
        var row = {};
        $(this)
          .find('td')
          .each(function (index) {
            if (index == 0) {
              //구분번호
              row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            } else if (index == 4) {
              //총잔고 숫자
              row[cols[7]] = Number(
                $(this).text().replaceAll(',', '').replaceAll(/\t|\n|\s/g, ""),
              );
            } else if (index == 7) {
              //오픈뱅킹등록여부
              row[cols[12]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            } else if (index == 8) {
              //계좌해지잔고이전
              row[cols[13]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            } else {
              if (index < 5) {
                row[cols[index * 2 - 1]] = $(this)
                  .find('p:eq(0)')
                  .text()
                  .replaceAll(/\t|\n|\s/g, "")
                  ;
                row[cols[index * 2]] = $(this)
                  .find('p:eq(1)')
                  .text()
                  .replaceAll(/\t|\n|\s/g, "")
                  ;
              } else {
                // 예수금 숫자
                  if (index == 5) {
                row[cols[index * 2 - 2]] = Number($(this)
                  .find('p:eq(0)')
                  .text()
                  .replace(/[^0-9]/g, '')
                  );
                row[cols[index * 2 - 1]] = $(this)
                  .find('p:eq(1)')
                  .text()
                  .replaceAll(/\t|\n|\s/g, "")
                  ;
                } else {
                  row[cols[index * 2 - 2]] = $(this)
                  .find('p:eq(0)')
                  .text()
                  .replaceAll(/\t|\n|\s/g, "")
                  ;
                row[cols[index * 2 - 1]] = $(this)
                  .find('p:eq(1)')
                  .text()
                  .replaceAll(/\t|\n|\s/g, "")
                  ;
                }
              }
            }
          });

        actAccNumberIndex == undefined || id < actAccNumberIndex - 1
          ? securitiesDetailResult.deactivated.push(row)
          : securitiesDetailResult.activated.push(row);
      });

      securitiesDetailResult.활동성계좌위치 = actAccNumberIndex ?? 'undefined';

      securitiesDetailResult.합계 = Number(
        $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tfoot > tr > td')
          .text()
          .replace(/[^0-9]/g, '')
          ,
      );

      Object.keys(securitiesDetailResult).forEach(key => {
        if (securitiesDetailResult[key].length == 0) {
          delete securitiesDetailResult[key];
        }
      });

      return securitiesDetailResult;
    });
    console.log('🚀 ~ file: payinfo.js ~ line 791 ~ securitiesDetailObj ~ securitiesDetailObj', securitiesDetailObj);
    payinfo.securities[i]['securitiesDetail'] = securitiesDetailObj;
    console.log('🚀 ~ file: payinfo.js ~ line 935 ~ payinfo', payinfo);

    // await frameset.click('#checkForm > div > a:nth-child(2)');

    // 증권사 전체 목록으로
    await frameset.evaluate(() => OnList())

    await frameset.waitForNavigation();
  }



  // 카드사
  // await frameset.click('#gnb > li:nth-child(2) > a');
  await frameset.evaluate(() => location.href="/card/qryCardSumr.do?menu=1&t=214702");

  await frameset.waitForNavigation();

  // await frameset.waitForSelector('#confirm');
  // await frameset.click('#confirm');
  // await frameset.click('#contents > div > div.btn_group2 > a');
  await frameset.evaluate(() => {
    $('#confirm')[0].checked = true;
    OnSearch();
  })

  await frameset.waitForNavigation();

  const cardsObj = await frameset.evaluate(() => {
    var cols = [];
    var cardsResult = [];

    $('#contents > div.section > div.tbl_list_inquiry2 > table > thead > tr > th').each(function (index) {
      cols.push($(this).text().replaceAll(/\t|\n|\s/g, ""));
    });
    cols = cols.filter(n => n) // 빈 값 제거
    console.log('카드 cols: ', cols);
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
      var row = {id: id + 1};
      $(this)
        .find('td')
        .each(function (index) {
          if (index == 2) {
            // 이용한도
            row[cols[index]] = Number($(this).text().replace(/[^0-9]/g, ''));
          }
          else if (index == 3) {
            // 단기카드대출(현금서비스)한도 음수
            row[cols[index + 1]] = Number($(this).text().replace(/[^0-9]/g, ''));
          } else if (index == 4) {
            // 상세조회
            row[cols[index - 1]] = $(this).text().replaceAll(/\t|\n|\s|','/g, "");
          } else {
            row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
          }
        });
      cardsResult.push(row);
    });

    return cardsResult;
  });

  console.log('cardsObj: ', cardsObj);
  payinfo['cards'] = cardsObj;
  console.log('🚀 ~ file: payinfo.js ~ line 980 ~ payinfo', payinfo);

  const cardsDetailLength = await frameset.$$eval('a.btn_policy', button => button.length);
  const cardsDetailButtons = await frameset.$$eval('a.btn_policy', buttons => buttons);
  console.log('🚀 ~ file: payinfo.js ~ line 494 ~ cardsDetailButtons', cardsDetailButtons);
  console.log('🚀 ~ file: payinfo.js ~ line 400 ~ cardsDetailLength', cardsDetailLength);

  // const detail = {}

  for (let i = 0; i < cardsDetailLength; i++) {
    console.log('card detail 횟수: ', i + 1);
    i > 0 ? await frameset.waitForNavigation() : null;
    await frameset.$$eval('a.btn_policy', (button, i) => button[i].click(), i);

    // console.log(page.frames())

    await frameset.waitForNavigation();
    await frameset.waitForSelector('#contents > div.section > div.btn_group > a:nth-child(2)');

    const detailView = await frameset.content();

    await frameset.waitForSelector('#contents > div.section > div.btn_group > a:nth-child(2)');

    // writeFileSync(`detail_${i}.html`, detailView);

    // const detailJson = tabletojson.convert(detailView);

    var cardsDetailResult = [];

    // 카드 info
    const cardsDetailObj = await frameset.evaluate(async cardsDetailResult => {
      var cols = [];
      await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr > th').each(function (
        index,
      ) {
        cols.push($(this).text().replaceAll(/\t|\n|\s/g, ""));
      });
      console.log('카드사 info cols: ', cols);

      await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > tbody > tr').each(function (id) {
        var row = {
          id: id + 1,
          title: $('#contents > div.section > div.tab > a.on > span').text(),
        };
        $(this)
          .find('td')
          .each(function (index) {
            row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
          });
        cardsDetailResult.push(row);
      });
      console.log('card info cardsDetailResult: ', cardsDetailResult);
      return cardsDetailResult;
    }, cardsDetailResult);
    console.log('🚀 ~ file: payinfo.js ~ line 904 ~ cardsDetailObj ~ cardsDetailObj', cardsDetailObj);
    // payinfo[`cardsDetail${i}`] = cardsDetailObj;
    // // console.log("🚀 ~ file: payinfo.js ~ line 1036 ~ payinfo", payinfo)
    payinfo.cards[i]['cardInfo'] = cardsDetailObj;

    // 결제예정금액
    await frameset.evaluate(() => OnSetl());
    await frameset.waitForNavigation();

    await frameset.evaluate(xInjection);

    
    const cardDetailHaveToPay = await frameset.evaluate(async cardsDetailResult => {
      var cols = [];
      // 연체금액 부연설명 제거
      $('img[alt="도움말"]').remove()

      // 결제단위 부연설명 제거
      $("div[class*='tooltip']").remove();

      // kb카드 = ['결제일', '결제계좌', '결제예정금액(결제일기준)', '연체금액(조회일기준)', '결제단위']
      // 삼성카드 = ['결제일', '결제계좌', '결제예정금액(결제일기준)', '결제단위', '연체금액']
      
      await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr > th').each(function (
        index,
      ) {
        cols.push($(this).text().replaceAll(/\t|\n|\s/g, ""));
      });
      cols.length > 5 ? cols = cols.filter(n => n) : cols;
      console.log('카드사 결제예정금액 cols: ', cols);

      await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > tbody > tr').each(function (id) {
        var row = {
          title: $('#contents > div.section > div.tab > a.on > span').text(),
        };
        $(this)
          .find('td')
          .each(function (index) {
            if (cols.indexOf('연체금액') > 0) {
              index == 2 ?
              row[cols[index]] = Number($(this).text().replace(/[^0-9]/g, ''))
              : index == 3 ? row[cols[index + 1]] = Number($(this).text().replace(/[^0-9]/g, ''))
              : index == 4 ? row[cols[index - 1]] = $(this).text().replaceAll(/\t|\n|\s/g, "")
              : row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            } else {
              index == 2 || index == 3 ?
              row[cols[index]] = Number($(this).text().replace(/[^0-9]/g, ''))
              : row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            }
          });
        cardsDetailResult.push(row);
      });
      console.log('card info + willpay cardsDetailResult: ', cardsDetailResult);
      return cardsDetailResult;
    }, cardsDetailResult);
    console.log('🚀 ~ file: payinfo.js ~ line 937 ~ cardDetailHaveToPay ~ cardDetailHaveToPay', cardDetailHaveToPay);
    // payinfo[`cardDetailHaveToPay${i}`] = cardDetailHaveToPay;
    // // console.log("🚀 ~ file: payinfo.js ~ line 1076 ~ payinfo", payinfo)
    payinfo.cards[i]['HaveToPay'] = cardDetailHaveToPay;

    // 최근 이용대금(명세서기준) 이동
    await frameset.evaluate(() => OnUse());
    await frameset.waitForNavigation();
    const cardDetailSpecification = await frameset.evaluate(async cardsDetailResult => {
      console.log('결제예정금액 이동');
      var cols = [];
      // 이용대금 부연설명 제거
      await $(
        '#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr:nth-child(1) > th.bbn > div > a',
      ).remove();
      await $(
        '#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr:nth-child(1) > th.bbn > div > div',
      ).remove();
      // 결제단위 부연설명 제거
      await $(
        '#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr:nth-child(1) > th.last > a',
      ).remove();
      await $(
        '#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr:nth-child(1) > th.last > div',
      ).remove();
      await $(
        '#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > tbody > tr:nth-child(1) > td.last > div > a',
      ).remove();

      await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr > th').each(function (
        index,
      ) {
        cols.push($(this).text().replaceAll(/\t|\n|\s/g, ""));
      });
      console.log('카드사 최근이용대금(명세서) cols: ', cols);

      await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > tbody > tr').each(function (id) {
        var row = {
          title: $('#contents > div.section > div.tab > a.on > span').text(),
        };
        $(this)
          .find('td')
          .each(function (index) {
            if (index == 4) {
              // 이용대금
              row[cols[index]] = Number($(this).text().replace(/[^0-9]/g, ''));
            }
              else if (index == 5) {
                // 연체금액
              row[cols[index + 2]] = Number($(this).text().replace(/[^0-9]/g, ''));
            } else if (index == 6) {
              row[cols[index - 1]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            } else {
              row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
            }
          });
        cardsDetailResult.push(row);
      });
      console.log('card info + willpay + havetopay cardsDetailResult: ', cardsDetailResult);
      return cardsDetailResult;
    }, cardsDetailResult);
    console.log(
      '🚀 ~ file: payinfo.js ~ line 979 ~ cardDetailSpecification ~ cardDetailSpecification',
      cardDetailSpecification,
    );
    console.log('cardsDetailResult: ', cardsDetailResult);
    payinfo.cards[i]['Specification'] = cardDetailSpecification;

    // i == cardsDetailLength ? payinfo[`cardsDetailResult${i}`] = cardsDetailResult: null;
    console.log('🚀 ~ file: payinfo.js ~ line 1135 ~ payinfo', payinfo);
    await frameset.evaluate(() => OnList());
  }

  await frameset.waitForNavigation();



  // 대출정보
  await frameset.evaluate(() => (location.href = '/extl/qryExtlLoan.do?menu=3'));

  await frameset.waitForSelector('#confirm');
  await frameset.$eval('#confirm', el => (el.checked = true));
  await frameset.$eval('#checkForm', el => el.submit());

  await frameset.waitForNavigation();

  const loanObj = await frameset.evaluate(() => {
    var cols = [];
    var loanResult = [];

    // ? 설명 제거
    $('#contents > div.section > div.tbl_list_inquiry2.mg_b50 > table > thead > tr > th.last > p > a').remove();
    $('#contents > div.section > div.tbl_list_inquiry2.mg_b50 > table > thead > tr > th.last > div').remove();

    $('#contents > div.section > div.tbl_list_inquiry2 > table > thead > tr > th').each(function (index) {
      cols.push($(this).text().replaceAll(/\t|\n|\s/g, ""));
    });
    console.log('대출 cols: ', cols);
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
      var row = {id: id + 1};
      $(this)
        .find('td')
        .each(function (index) {
          index == 4 ? 
          row[cols[index]] = Number($(this).text().replace(/[^0-9]/g, ''))
          : row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
        });
      loanResult.push(row);
    });

    return loanResult;
  });

  console.log('loanObj: ', loanObj);
  payinfo['loan'] = loanObj;
  console.log('🚀 ~ file: payinfo.js ~ line 1177 ~ payinfo', payinfo);





  // 보험정보
  await frameset.evaluate(() => (location.href = '/extl/qryExtlFxamtIns.do?menu=1'));

  await frameset.waitForSelector('#confirm');
  await frameset.$eval('#confirm', el => (el.checked = true));
  await frameset.$eval('#checkForm', el => el.submit());

  await frameset.waitForNavigation();

  const insuaranceObj1 = await frameset.evaluate(() => {
    var head = [];
    var cols = [];
    var insuaranceResult = [];

    // row-title에서 선택됨 span 제거
    $('#contents > div.section > form > div.tab > a.on > span > span.hidden')?.remove();

    $('#contents > div.section > div.tbl_list_inquiry2 > table > thead > tr > th').each(function (index) {
      cols.push($(this).text().replaceAll(/\t|\n|\s/g, ""));
    });
    console.log('정액형 보험 cols: ', cols);
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
      
      var row = {
        title: $('#contents > div.section > form > div.tab > a.on > span').text(),
      };
      $(this)
        .find('td')
        .each(function (index) {
          if (index == 7) { //1회보험료
            Number(row[cols[index]] = $(this).text().replace(/[^0-9]/g, ''));
          } else {row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
          }
        });
      insuaranceResult.push(row);
    });

    return insuaranceResult;
  });

  console.log('insuaranceObj_xamt: ', insuaranceObj1);
  payinfo['insuarance'] = [];
  payinfo.insuarance['xamt'] = insuaranceObj1;
  console.log('🚀 ~ file: payinfo.js ~ line 1220 ~ payinfo', payinfo);

  await frameset.evaluate(() => (location.href = 'qryExtlActlossIns.do?menu=1'));

  await frameset.waitForNavigation();

  const insuaranceObj2 = await frameset.evaluate(() => {
    var head = [];
    var cols = [];
    var insuaranceResult = [];

    // row-title에서 선택됨 span 제거
    $('#contents > div.section > form > div.tab > a.on > span > span').remove();

    $('#contents > div.section > div.tbl_list_inquiry2 > table > thead > tr > th').each(function (index) {
      cols.push($(this).text().replaceAll(/\t|\n|\s/g, ""));
    });
    console.log('실손형 보험 cols: ', cols);
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
      var row = {
        title: $('#contents > div.section > form > div.tab > a.on > span').text(),
      };
      $(this)
        .find('td')
        .each(function (index) {
          row[cols[index]] = $(this).text().replaceAll(/\t|\n|\s/g, "");
        });
      insuaranceResult.push(row);
      console.log('🚀 ~ file: payinfo.js ~ line 1224 ~ insuaranceResult', insuaranceResult);
    });

    return insuaranceResult;
  });

  console.log('insuaranceObj_loss: ', insuaranceObj2);
  payinfo.insuarance['loss'] = insuaranceObj2;
  console.log('🚀 ~ file: payinfo.js ~ line 1257 ~ payinfo', payinfo);


  
  const dayKO = dayjs().format("LL LTS")
  
  const payinfoToFB = {}
  payinfoToFB[dayKO] = {...payinfo};
  console.log("🚀 ~ file: payinfo.js:1555 ~ payinfoToFB", payinfoToFB)
  
  update(startRef, payinfoToFB, {merge: true});
  
  writeFileSync(`payinfo_${dayKO}.json`, JSON.stringify({...payinfoToFB}))

  console.log('firebase/payinfo/날짜 merge updated')

  await frameset.waitForNavigation();
})();
