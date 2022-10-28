// const puppeteer = require("puppeteer");
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteerExtraPluginUserAgentOverride from 'puppeteer-extra-plugin-stealth/evasions/user-agent-override/index.js';
import {writeFileSync, appendFileSync} from 'fs';
import path from 'path';
import dayjs from 'dayjs';
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
    switch (req.resourceType()) {
      case 'font':
        // case "image":
        req.abort();
        break;
      default:
        req.continue();
    }
    // req.continue();
  });

  page.setDefaultNavigationTimeout(60000000);

  const navigationPromise = page.waitForNavigation();

  await page.goto('https://payinfo.or.kr/', {
    waitUntil: 'networkidle0',
  });

  const client = await page.target().createCDPSession();
  const cookies = (await client.send('Network.getAllCookies')).cookies;
  console.log('🚀 ~ file: payinfo.js ~ line 66 ~ cookies', cookies);

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
  console.log('🚀 ~ file: payinfo.js ~ line 60 ~ page', page.frames());

  const [, , secondStartFrame] = await page.frames();

  const testCaptureImg = await secondStartFrame.waitForSelector(
    '#wrap > div.main_container > div.quick_menu > ul > li.quick_m04 > a > img',
  );
  // await testCaptureImg.click({ button: "right" })

  // await secondStartFrame.keyboard.type('g')

  // await secondStartFrame.keyboard.press('Enter')

  const img = await testCaptureImg.screenshot({
    path: './test.png',
  });

  await secondStartFrame.waitForSelector('#gnb > li:nth-child(1) > a');
  await secondStartFrame.click('#gnb > li:nth-child(1) > a');

  page.on('dialog', async dialog => {
    console.log('dialog', dialog);
    dialog.dismiss();
  });

  await secondStartFrame.waitForNavigation();

  console.log('page.frames()', page.frames());

  const [, , , , , mainFrame] = page.frames();
  // await mainFrame.waitForNavigation();

  await mainFrame.waitForNavigation();

  await mainFrame.waitForSelector('#r_chk_all', {waitUntil: 'load'});
  await mainFrame.click('#r_chk_all');

  await mainFrame.waitForSelector('#contents > div.btn_group2 > a');
  await mainFrame.click('#contents > div.btn_group2 > a');

  console.log('frames', page.frames());

  await mainFrame.waitForSelector('#rlnmNum1', {waitUntil: 'load'});
  await mainFrame.click('#rlnmNum1');
  // page.on("dialog", async (dialog) => {
  //   dialog.dismiss();
  // });
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

  console.log('YESKEY 화면 뜬  후', page.frames());

  const iFrame = await mainFrame.waitForSelector('#finCertSdkIframe', {waitUntil: 'load'});
  console.log('🚀 ~ file: payinfo.js ~ line 167 ~ iFrame', iFrame);

  // const finCertSdkIframe = await page.frames().find(frame => frame.childFrames()[0]);
  // console.log("🚀 ~ file: payinfo.js ~ line 165 ~ finCertSdkIframe", finCertSdkIframe)

  // await mainFrame.waitForNavigation();
  const finCertSdkIframe = await iFrame.contentFrame();
  console.log('🚀 ~ file: payinfo.js ~ line 174 ~ finCertSdkIframe', finCertSdkIframe);

  await finCertSdkIframe.waitForSelector('#CLOUD_ID_1', {waitUntil: 'load'});

  const getPubKeyIdRes = {};
  const isDeviceInitial = await finCertSdkIframe.evaluate(
    async getPubKeyIdRes => await finCertClient.main.getPubKeyId().then(res => (getPubKeyIdRes = res)),
  );
  console.log('🚀 ~ file: payinfo.js ~ line 175 ~ isDeviceInitial', isDeviceInitial);

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

  await finCertSdkIframe.evaluate(() => {
    // puppeteer text -> mac client[clipboard]
    // 화면에 표시된 인증 2자리 숫자를 browser clipboard에 넣어서 mac client clipboard에서도 동시에 접근 paste 할 수 있도록
    navigator.clipboard.writeText(
      $(
        '#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.code_info_area > div.code_confirm_number',
      )[0].textContent,
    );
  });
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

  console.log('5009입력 후 frames', page.frames());

  const [, , , , , frameset] = page.frames();
  await frameset.evaluate(() => {
    console.log(document.location);
    console.log('본인 확인하러가기 frame document 맞나?');
  });

  await frameset.waitForSelector('#contents > div > a > div > span', {waitUntil: 'load'});
  await frameset.click('#contents > div > a > div > span');

  await frameset.waitForNavigation();

  const captchaGCV = async () => {
    var captchaSolveText = '';
    console.log('--캡챠solve시작--');
    console.log('captchaGCV');
    // await frameset.waitForTimeout(100)

    // await frameset.click('#reLoad')
    await frameset.waitForTimeout(200);
    const captchaImg = await frameset.waitForSelector('#catpcha > img');
    console.log('🚀 ~ file: payinfo.js ~ line 296 ~ captchaGCV ~ captchaImg', captchaImg);

    try {
      const catchaScreenshot = await captchaImg.screenshot({
        // encoding: "base64",
        path: './payinfoCaptchaImg.png',
      });
    } catch (e) {
      console.log(e);
      console.log('exception    ');
    }

    const GCVclient = new ImageAnnotatorClient();
    const fileName = './payinfoCaptchaImg.png';

    // Performs text detection on the local file
    const [result] = await GCVclient.textDetection(fileName);
    const detections = result.textAnnotations;
    // detections.forEach(text => {
    //     return console.log('detections forEach', text.description)
    // })

    detections[1].description
      ? console.log(`${fileName}` + `s Text: ${detections[1].description}`)
      : (await frameset.click('#reLoad')) + captchaGCV();

    await frameset.waitForSelector('#answer', {waitUntil: 'load'});
    await frameset.type('#answer', detections[1].description);
    captchaSolveText = detections[1].description;
    await frameset.click('#frmSubmit');
    const resultOKorNot = await frameset.$eval('#resultImg', el => (el.value === 'ok' ? true : false));
    console.log('🚀 ~ file: payinfo.js ~ line 377 ~ captchaGCV ~ resultOKorNot', resultOKorNot);

    (await resultOKorNot) ? null : await captchaGCV(captchaSolveText);
  };

  try {
    const solvedCaptcha = await captchaGCV();
    console.log('🚀 ~ file: payinfo.js ~ line 395 ~ solvedCaptcha', solvedCaptcha);
  } catch {
    (await frameset.click('#reLoad')) + captchaGCV() + console.log('GCV인식오류로 재실행');
  }

  await frameset.evaluate(async() => {
    await $('#fncOrgCode > option:nth-child(2)').prop('selected', true);
    console.log('하나은행 option 선택');
    await $('#cellNum').val('01088957500');
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
  console.log('🚀 ~ file: payinfo.js ~ line 375 ~ sentTimeISO', sentTimeISO);

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
  const resultOut = async resultoutreturn => {
    console.log('resultoutreturn: ', resultoutreturn),
      await frameset.type('#smsNum', resultoutreturn.text.replace(/[^0-9]/g, ''));
  };

  await frameset.waitForFunction(
    () => {
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
  //  console.log("🚀 ~ file: payinfo.js ~ line 535 ~ f", f)
  //  const x = await f.contentFrame();
  //  const n = await x.$("txt_link")
  //  console.log("🚀 ~ file: payinfo.js ~ line 539 ~ n", n)

  await frameset.waitForNavigation();

  const qryAcntSum = await frameset.content();
  // fs.writeFileSync('qryAcntSum.html', qryAcntSum);

  // const html = fs.readFileSync(path.resolve(__dirname, 'qryAcntSum.html'), {encoding: 'UTF-8'});
  const converted = tabletojson.convert(qryAcntSum);
  writeFileSync('convertedWhole.json', JSON.stringify(converted));




  
  
  // 은행권
  const bankWholeObj = await frameset.evaluate(() => {
    var cols = [];
    var bankresult = [];
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2.stripes > table > thead > tr > th ').each(function () {
      cols.push($(this).text().toLowerCase());
    });
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2.stripes > table > tbody > tr').each(function (id) {
      var row = {id: id + 1};
      $(this)
        .find('td')
        .each(function (index) {
          if (index > 0 && index < 7) {
            row[cols[index] + '_비활동'] = $(this).find('p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', '');
            row[cols[index] + '_활동'] = $(this).find('p:eq(1)').text().replaceAll('\t', '').replaceAll('\n', '');
          } else {
            row[cols[index]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '');
          }
        });
      bankresult.push(row);
    });
    return bankresult;
  });
  console.log('🚀 ~ file: payinfo.js ~ line 513 ~ bankWholeObj ~ bankWholeObj', bankWholeObj);

  const bankDetailLength = await frameset.$$eval('a.btn_policy', button => button.length);
  const bankDetailButtons = await frameset.$$eval('a.btn_policy', buttons => buttons);
  console.log('🚀 ~ file: payinfo.js ~ line 494 ~ bankDetailButtons', bankDetailButtons);
  console.log('🚀 ~ file: payinfo.js ~ line 400 ~ bankDetailLength', bankDetailLength);

  // const detail = {}

  for (let i = 0; i < bankDetailLength; i++) {
    await frameset.$$eval('a.btn_policy', (button, i) => button[i].click(), i);

    // console.log(page.frames())

    await frameset.waitForNavigation();
    await frameset.waitForSelector('#contents > div:nth-child(3) > div.btn_group > a:nth-child(2)');

    const detailView = await frameset.content();

    await frameset.waitForSelector('#contents > div:nth-child(3) > div.btn_group > a:nth-child(2)');

    writeFileSync(`detail_${i}.html`, detailView);

    const detailJson = tabletojson.convert(detailView);

    const bankDetailObj = await frameset.evaluate(() => {
      var cols = [];
      var bankDetailResult = [];
      $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > thead > tr > th').each(function (index) {
        if (index < 7 && index != 4) {
          cols.push($(this).find('p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', ''));
          cols.push($(this).find('p:eq(1)').text().replaceAll('\t', '').replaceAll('\n', ''));
        } else {
          cols.push($(this).text().replaceAll('\t', '').replaceAll('\n', ''));
        }
      });
      $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
        var row = {id: id + 1};
        $(this)
          .find('td')
          .each(function (index) {
            if (index < 7 && index != 4) {
              row[cols[index * 2]] = $(this).find('p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', '');
              row[cols[index * 2 + 1]] = $(this).find('p:eq(1)').text().replaceAll('\t', '').replaceAll('\n', '');
            } else if (index == 4) {
              row[cols[index * 2]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '');
            } else {
              row[cols[index * 2 - 1]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '').trim();
            }
          });
        bankDetailResult.push(row);
      });

      bankDetailResult.push({
        합계: $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tfoot > tr > td')
          .text()
          .replaceAll('\t', '')
          .replaceAll('\n', ''),
      });

      return bankDetailResult;
    });
    console.log('🚀 ~ file: payinfo.js ~ line 568 ~ bankDetailObj ~ bankDetailObj', bankDetailObj);

    i == 0
      ? writeFileSync('detail.json', JSON.stringify(detailJson))
      : appendFileSync('detail.json', ',' + JSON.stringify(detailJson));

    await frameset.click('#contents > div:nth-child(3) > div.btn_group > a:nth-child(2)');

    await frameset.waitForNavigation();
  };





  
  
  // 2금융권(저축은행, 우체국)
  await frameset.click('#lnb > li:nth-child(2) > a');

  await frameset.waitForNavigation();

  const secondTeerObj = await frameset.evaluate(() => {
    var cols = [];
    var secondTeerResult = [];

    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2.stripes > table > thead > tr > th').each(function (index) {
      cols.push($(this).text().replaceAll('\t', '').replaceAll('\n', ''));
    });
    console.log('cols: ', cols);
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
      var row = {id: id + 1};
      $(this)
        .find('td')
        .each(function (index) {
          if (index > 0 && index < 7) {
            row[cols[index] + '_비활동'] = $(this).find('p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', '');
            row[cols[index] + '_활동'] = $(this).find('p:eq(1)').text().replaceAll('\t', '').replaceAll('\n', '');
          } else {
            row[cols[index]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '');
          }
        });
      secondTeerResult.push(row);
    });

    return secondTeerResult;
  });

  console.log('secondTeerObj: ', secondTeerObj);

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

    const secondTeerDetailView = await frameset.content();

    await frameset.waitForSelector('#contents > div:nth-child(3) > div.btn_group > a:nth-child(2)');

    writeFileSync(`SecondTeerDetail_${i}.html`, secondTeerDetailView);

    const secondTeerDetailJson = tabletojson.convert(secondTeerDetailView);

    const secondTeerDetailObj = await frameset.evaluate(() => {
      var cols = [];
      var secondTeerDetailResult = [];
      $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > thead > tr > th').each(function (index) {
        if (index == 2) {
          // 지점명 ? 때문에 div > p 랑 그냥 p 각각 eq(0)으로 되어있음
          cols.push($(this).find('div > div > div > p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', ''));
          cols.push($(this).find('p:eq(2)').text().replaceAll('\t', '').replaceAll('\n', ''));
        } else if (index < 7 && index != 4) {
          cols.push($(this).find('p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', ''));
          cols.push($(this).find('p:eq(1)').text().replaceAll('\t', '').replaceAll('\n', ''));
        } else {
          cols.push($(this).text().replaceAll('\t', '').replaceAll('\n', ''));
        }
      });
      console.log('2nd Teer cols: ', cols);
      $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
        var row = {id: id + 1};
        $(this)
          .find('td')
          .each(function (index) {
            if (index == 2) {
              row[cols[index * 2]] = $(this).find('p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', '');
              row[cols[index * 2 + 1]] = $(this).find('p:eq(2)').text().replaceAll('\t', '').replaceAll('\n', '');
            } else if (index < 7 && index != 4) {
              row[cols[index * 2]] = $(this).find('p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', '');
              row[cols[index * 2 + 1]] = $(this).find('p:eq(1)').text().replaceAll('\t', '').replaceAll('\n', '');
            } else if (index == 4) {
              row[cols[index * 2]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '');
            } else {
              row[cols[index * 2 - 1]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '').trim();
            }
          });
        secondTeerDetailResult.push(row);
      });

      secondTeerDetailResult.push({
        합계: $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tfoot > tr > td')
          .text()
          .replaceAll('\t', '')
          .replaceAll('\n', ''),
      });

      return secondTeerDetailResult;
    });
    console.log('🚀 ~ file: payinfo.js ~ line 568 ~ secondTeerDetailObj ~ secondTeerDetailObj', secondTeerDetailObj);

    i == 0
      ? writeFileSync('detail.json', JSON.stringify(secondTeerDetailJson))
      : appendFileSync('detail.json', ',' + JSON.stringify(secondTeerDetailJson));

    await frameset.click('#contents > div:nth-child(3) > div.btn_group > a:nth-child(2)');

    await frameset.waitForNavigation();
  }

  console.log('저축은행 obj 완료');








  // 증권사
  await frameset.waitForSelector('#lnb > li:nth-child(3) > a');
  await frameset.click('#lnb > li:nth-child(3) > a');

  await frameset.waitForSelector('#confirm');
  await frameset.click('#confirm');
  await frameset.click('#contents > div > div.btn_group2 > a');

  await frameset.waitForNavigation();


  const securitiesObj = await frameset.evaluate(() => {
    var cols = [];
    var securitiesResult = [];

    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2.stripes > table > thead > tr > th').each(function (index) {
      cols.push($(this).text().replaceAll('\t', '').replaceAll('\n', ''));
    });
    console.log('cols: ', cols);
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
      var row = {id: id + 1};
      $(this)
        .find('td')
        .each(function (index) {
          if (index > 0 && index < 7) {
            row[cols[index] + '_비활동'] = $(this).find('p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', '');
            row[cols[index] + '_활동'] = $(this).find('p:eq(1)').text().replaceAll('\t', '').replaceAll('\n', '');
          } else {
            row[cols[index]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '');
          }
        });
      securitiesResult.push(row);
    });

    return securitiesResult;
  });

  console.log('securitiesObjObj: ', securitiesObj);


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

    const detailView = await frameset.content();

    await frameset.waitForSelector('#checkForm > div > a:nth-child(2)');

    writeFileSync(`detail_${i}.html`, detailView);

    const detailJson = tabletojson.convert(detailView);

    const securitiesDetailObj = await frameset.evaluate(() => {
      var cols = [];
      var securitiesDetailResult = [];
      $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > thead > tr > th').each(function (index) {
        if (index == 5) {
          cols.push($(this).find('p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', '').trim());
          cols.push($(this).find('div > p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', '').trim());
        } else if (index == 6) {
          cols.push($(this).find('div > p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', '').trim());
          cols.push($(this).find('p:eq(2)').text().replaceAll('\t', '').replaceAll('\n', '').trim());
        } else if (index < 7 && index != 4) {
          cols.push($(this).find('p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', '').trim());
          cols.push($(this).find('p:eq(1)').text().replaceAll('\t', '').replaceAll('\n', '').trim());
        } else {
          cols.push($(this).text().replaceAll('\t', '').replaceAll('\n', ''));
        }
      });
      console.log('증권사 cols: ', cols);
      $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
        var row = {id: id + 1};
        $(this)
          .find('td')
          .each(function (index) {
            if (index == 4) {
              row[cols[index * 2]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '');
            } else if (index == 5 || index == 6) {
              row[cols[index * 2 - 1]] = $(this).find('p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', '');
              row[cols[index * 2]] = $(this).find('p:eq(1)').text().replaceAll('\t', '').replaceAll('\n', '');
            } else if (index < 7 && index != 4) {
              row[cols[index * 2]] = $(this).find('p:eq(0)').text().replaceAll('\t', '').replaceAll('\n', '');
              row[cols[index * 2 + 1]] = $(this).find('p:eq(1)').text().replaceAll('\t', '').replaceAll('\n', '');
            } else {
              row[cols[index * 2 - 1]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '').trim();
            }
          });
        securitiesDetailResult.push(row);
      });

      securitiesDetailResult.push({
        합계: $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tfoot > tr > td')
          .text()
          .replaceAll('\t', '')
          .replaceAll('\n', '')
          .trim(),
      });

      return securitiesDetailResult;
    });
    console.log('🚀 ~ file: payinfo.js ~ line 791 ~ securitiesDetailObj ~ securitiesDetailObj', securitiesDetailObj);

    await frameset.click('#checkForm > div > a:nth-child(2)');

    await frameset.waitForNavigation();

  };





  // 카드사
  await frameset.click('#gnb > li:nth-child(2) > a');

  await frameset.waitForNavigation();

  await frameset.waitForSelector('#confirm');
  await frameset.click('#confirm');
  await frameset.click('#contents > div > div.btn_group2 > a');

  await frameset.waitForNavigation();

  const cardsObj = await frameset.evaluate(() => {
    var cols = [];
    var cardsResult = [];

    $('#contents > div.section > div.tbl_list_inquiry2 > table > thead > tr > th').each(function (index) {
      cols.push($(this).text().replaceAll('\t', '').replaceAll('\n', ''));
    });
    console.log('카드 cols: ', cols);
    $('#contents > div:nth-child(3) > div.tbl_list_inquiry2 > table > tbody > tr').each(function (id) {
      var row = {id: id + 1};
      $(this)
        .find('td')
        .each(function (index) {
            if (index == 3) {
            row[cols[index + 2]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '');
            } else {
            row[cols[index]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '');
            }
        });
      cardsResult.push(row);
    });

    return cardsResult;
  });

  console.log('cardsObj: ', cardsObj);


  const cardsDetailLength = await frameset.$$eval('a.btn_policy', button => button.length);
  const cardsDetailButtons = await frameset.$$eval('a.btn_policy', buttons => buttons);
  console.log('🚀 ~ file: payinfo.js ~ line 494 ~ cardsDetailButtons', cardsDetailButtons);
  console.log('🚀 ~ file: payinfo.js ~ line 400 ~ cardsDetailLength', cardsDetailLength);

  // const detail = {}
  
  for (let i = 0; i < cardsDetailLength; i++) {
    console.log('card detail 횟수: ', i + 1)
    i > 0 ? await frameset.waitForNavigation() : null;
    await frameset.$$eval('a.btn_policy', (button, i) => button[i].click(), i);

    // console.log(page.frames())

    await frameset.waitForNavigation();
    await frameset.waitForSelector('#contents > div.section > div.btn_group > a:nth-child(2)');

    const detailView = await frameset.content();

    await frameset.waitForSelector('#contents > div.section > div.btn_group > a:nth-child(2)');

    writeFileSync(`detail_${i}.html`, detailView);

    const detailJson = tabletojson.convert(detailView);

    
    
    var cardsDetailResult = [];
    
    // 카드 info
    const cardsDetailObj = await frameset.evaluate(async(cardsDetailResult) => { 
      var cols = [];
      await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr > th').each(function (index) {
        cols.push($(this).text().replaceAll('\t', '').replaceAll('\n', ''));
      });
      console.log('카드사 info cols: ', cols);
      
      await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > tbody > tr').each(function (id) {
        var row = {
          id: id + 1,
          title: $('#contents > div.section > div.tab > a.on > span').text()
        };
        $(this)
          .find('td')
          .each(function (index) {
              row[cols[index]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '').trim();
          });
          cardsDetailResult.push(row);
        });
        console.log('card info cardsDetailResult: ', cardsDetailResult)
        return cardsDetailResult;
    }, cardsDetailResult);
    console.log("🚀 ~ file: payinfo.js ~ line 904 ~ cardsDetailObj ~ cardsDetailObj", cardsDetailObj)
    
    

    // 결제예정금액
    await frameset.evaluate(() => OnSetl());
    await frameset.waitForNavigation();
    const cardDetailHaveToPay = await frameset.evaluate(async(cardsDetailResult) => {
      var cols = [];
       // 연체금액 부연설명 제거
       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr > th:nth-child(4) > div > a').remove();
       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr > th:nth-child(4) > div > div').remove();
       // 결제단위 부연설명 제거
       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr > th.last > a').remove();
       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr > th.last > div').remove();
       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr > th').each(function (index) {
         cols.push($(this).text().replaceAll('\t', '').replaceAll('\n', '').replaceAll('  ', '').trim());
       });
       console.log('카드사 결제예정금액 cols: ', cols);

       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > tbody > tr').each(function (id) {
        var row = {
          title: $('#contents > div.section > div.tab > a.on > span').text()
        };
        $(this)
          .find('td')
          .each(function (index) {
              row[cols[index]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '').trim();
          });
        cardsDetailResult.push(row);
      });
      console.log('card info + willpay cardsDetailResult: ', cardsDetailResult)
      return cardsDetailResult;
    }, cardsDetailResult);
    console.log("🚀 ~ file: payinfo.js ~ line 937 ~ cardDetailHaveToPay ~ cardDetailHaveToPay", cardDetailHaveToPay)
    




      // 최근 이용대금(명세서기준) 이동
      await frameset.evaluate(() => OnUse());
      await frameset.waitForNavigation();
      const cardDetailSpecification = await frameset.evaluate(async(cardsDetailResult) => {
      console.log('결제예정금액 이동')
      var cols = [];
       // 이용대금 부연설명 제거
       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr:nth-child(1) > th.bbn > div > a').remove();
       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr:nth-child(1) > th.bbn > div > div').remove();
       // 결제단위 부연설명 제거
       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr:nth-child(1) > th.last > a').remove();
       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr:nth-child(1) > th.last > div').remove();
       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > tbody > tr:nth-child(1) > td.last > div > a').remove();

       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > thead > tr > th').each(function (index) {
         cols.push($(this).text().replaceAll('\t', '').replaceAll('\n', '').replaceAll('  ', '').trim());
       });
       console.log('카드사 최근이용대금(명세서) cols: ', cols);

       await $('#contents > div.section > div.tbl_list_inquiry2.mg_b30 > table > tbody > tr').each(function (id) {
        var row = {
          title: $('#contents > div.section > div.tab > a.on > span').text()
        };
        $(this)
          .find('td')
          .each(function (index) {
              if (index == 5) {
               row[cols[index + 2]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '').trim();   
              } else if (index == 6) {
               row[cols[index - 1]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '').trim();   
              } 
              else {
              row[cols[index]] = $(this).text().replaceAll('\t', '').replaceAll('\n', '').trim();
              }
          });
        cardsDetailResult.push(row);
      });
      console.log('card info + willpay + havetopay cardsDetailResult: ', cardsDetailResult)
      return cardsDetailResult;
    }, cardsDetailResult);
      console.log("🚀 ~ file: payinfo.js ~ line 979 ~ cardDetailSpecification ~ cardDetailSpecification", cardDetailSpecification)


      i == cardsDetailLength ? console.log('cards Detail result: ',  cardsDetailResult) : null;
      await frameset.evaluate(() => OnList());

    };
    
    // 카드 전체 목록으로
    

    await frameset.waitForNavigation();

  



})();
