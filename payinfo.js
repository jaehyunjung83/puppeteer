// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const puppeteerExtraPluginUserAgentOverride = require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");
const fs = require("fs");
const dayjs = require("dayjs");
require("dayjs/locale/ko");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
const download = require("image-downloader");
const cheerio = require('cheerio');

const stealthPlugin = StealthPlugin();
stealthPlugin.enabledEvasions.delete("user-agent-override");
puppeteer.use(stealthPlugin);
const pluginUserAgentOverride = puppeteerExtraPluginUserAgentOverride({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
  platform: "Win32",
});
puppeteer.use(pluginUserAgentOverride);

(async () => {
  const browser = await puppeteer.launch(
    { headless: false, devtools: false },
    { args: [
      '--start-fuulscreen',
      // "--window-size=1920,1080", 
      "--disable-notifications", 
      '--disable-web-security',
      // '--disable-features=IsolateOrigins',
      // '--disable-features=BlockInsecurePrivateNetworkRequests',
      // '--disable-site-isolation-trials'
    ] }
    // { userDataDir: './user-data-dir' }
  );

  const page = await browser.newPage();
  

  await page.setRequestInterception(true);

  page.on("request", (req) => {
    switch (req.resourceType()) {
      case "font":
      case "image":
        req.abort();
        break;
      default:
        req.continue();
    }
    // req.continue();
  });

  page.setDefaultNavigationTimeout(0);

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://payinfo.or.kr/", {
    waitUntil: "networkidle0",
  });


  // await page.setViewport({ width: 1080, height: 1080 });
  console.log("🚀 ~ file: payinfo.js ~ line 60 ~ page", page.frames())

  const [ , , secondStartFrame,] = await page.frames();
  

  await secondStartFrame.waitForSelector('#gnb > li:nth-child(1) > a')
  await secondStartFrame.click('#gnb > li:nth-child(1) > a');

  page.on("dialog", async (dialog) => {
    console.log("dialog", dialog);
    dialog.dismiss();
  });


  // await page.waitForNavigation();

  
  
  // await browser
  // .pages()
  // .then((pages) => console.log("내계좌한눈에 클릭 후 redirect page:", pages));
  
  await secondStartFrame.waitForNavigation();
  
  console.log('page.frames()', page.frames())
  
  
  const [ , , , , , mainFrame] = page.frames();
  // await mainFrame.waitForNavigation();

  await mainFrame.waitForNavigation();

  await mainFrame.waitForSelector('#r_chk_all', { waitUntil: 'load'})
  await mainFrame.click('#r_chk_all');

  await mainFrame.waitForSelector('#contents > div.btn_group2 > a')
  await mainFrame.click('#contents > div.btn_group2 > a');
  
  console.log('frames', page.frames())

  await mainFrame.waitForSelector('#rlnmNum1', { waitUntil: 'load'})
  await mainFrame.click('#rlnmNum1')
  // page.on("dialog", async (dialog) => {
  //   dialog.dismiss();
  // });
  await mainFrame.type('#rlnmNum1', '831206')
  
  // console.log('frames', page.frames())
  // await mainFrame.$eval('#rlnmNum1', (eval) => console.log(eval), eval.val('831206') )

  // await mainFrame.click('#rlnmNum2')
  // await mainFrame.type('#rlnmNum2', '1001722')
  // await mainFrame.$eval('#rlnmNum2', (eval) => eval.value = '1001722')

  // const eval = await mainFrame.evaluate(() => {
  //   return document.getElementsByTagName('form').frmMain1
  //   });
  // console.log("🚀 ~ file: payinfo.js ~ line 106 ~ eval ~ eval", eval)
  
  
  // const nppfsStartUp = await mainFrame.evaluate(() => { 
  //   const frmMain1 = document.getElementsByTagName('form').frmMain1;
  //    window.npPfsStartup(frmMain1, true, true, false, true, "enc", "on") 
  //   });

  // const npVCtrl = await mainFrame.evaluate(() =>  window.npVCtrl );
  // console.log("🚀 ~ file: payinfo.js ~ line 115 ~ npVCtrl", npVCtrl)


  // page.on("request", (req) => {
    
  //   switch (req.resourceType()) {
  //     // case "font":
  //     // case "image":
  //     //   req.abort();
  //       // break;
  //     default:
  //       req.continue();
  //   }
  //   // req.continue();
  // });

  await mainFrame.waitForSelector('#nppfs-keypad-rlnmNum2 > div', { waitUntil: 'load'});
  await mainFrame.evaluate(() => {
    frmMain1.installed.value = 'T';
    console.log('frmMain1.installed.value: ', frmMain1.installed.value)
    // yessignInstall.js "인증서 관련 환경 아니다.." 오류 없애게
    // isSupported() false이면 500900입력하고 휴대폰 인증으로 안 넘어가고 다시 agree화면으로 back
    npAddon.isSupported = function() {
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
    const touchEnButtonConfirm = Object.values(window.npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.action == 'action:enter').action;
  
  
    $(`img[data-action="${touchEnButton1}"]`).click().keyup();   //  주민번호 TouchEnKey 창에서 data-action attr이 'data:211ca898b2bf92e503367b090adce492eafc8f41:1'인 element를 찾아 클릭한다.
    $(`img[data-action="${touchEnButton0}"]`).click().keyup();
    $(`img[data-action="${touchEnButton0}"]`).click().keyup();
    $(`img[data-action="${touchEnButton1}"]`).click().keyup();   
    $(`img[data-action="${touchEnButton7}"]`).click().keyup();   
    $(`img[data-action="${touchEnButton2}"]`).click().keyup();   
    $(`img[data-action="${touchEnButton2}"]`).click().keyup();   
    $(`img[data-action="${touchEnButtonConfirm}"]`).click();   

    console.log('frmMain1.rlnmNum1.value: ', frmMain1.rlnmNum1.value),
    console.log('frmMain1.rlnmNum2.value: ', frmMain1.rlnmNum2.value),
    console.log('frmMain1.rlnmNum.value: ', frmMain1.rlnmNum.value)
   
    console.log('jumin2 hash value', npVCtrl.keypadObject[0]._hashelement[0].value)
  }
  );

  const frmMain1 = await mainFrame.evaluate(() => frmMain1.rlnmNum.value);
  console.log("🚀 ~ file: payinfo.js ~ line 184 ~ frmMain1", frmMain1)

  // await mainFrame.waitForSelector('#contents > div > div > div:nth-child(4) > div > a:nth-child(2)')
  // await mainFrame.click('#contents > div > div > div:nth-child(4) > div > a:nth-child(2)')
  
  await mainFrame.evaluate(() => window.signFin(frmMain1, frmMain1.rlnmNum.value , OID4Personal, null, null, '01'));
  
  console.log('YESKEY 화면 뜬  후', page.frames());
  
  const iFrame = await mainFrame.waitForSelector('#finCertSdkIframe', { waitUntil: 'load'});
  console.log("🚀 ~ file: payinfo.js ~ line 167 ~ iFrame", iFrame)
  
  // const finCertSdkIframe = await page.frames().find(frame => frame.childFrames()[0]);
  // console.log("🚀 ~ file: payinfo.js ~ line 165 ~ finCertSdkIframe", finCertSdkIframe)

  // await mainFrame.waitForNavigation();
  const finCertSdkIframe = await iFrame.contentFrame();
  console.log("🚀 ~ file: payinfo.js ~ line 174 ~ finCertSdkIframe", finCertSdkIframe)

  await finCertSdkIframe.waitForSelector('#CLOUD_ID_1', { waitUntil: 'load'})

  

  const getPubKeyIdRes = {}
  const isDeviceInitial = await finCertSdkIframe.evaluate(
    async(getPubKeyIdRes) => 
      await finCertClient.main.getPubKeyId()
      .then((res) => getPubKeyIdRes = res)
    )
  console.log("🚀 ~ file: payinfo.js ~ line 175 ~ isDeviceInitial", isDeviceInitial)
  
  
 
  

  
  await finCertSdkIframe.waitForSelector('#CLOUD_ID_1', { waitUntil: 'load'})
  await finCertSdkIframe.click('#CLOUD_ID_1')
  await finCertSdkIframe.type('#CLOUD_ID_1', '정재현')

  
  


  await finCertSdkIframe.waitForTimeout(300)
  await finCertSdkIframe.waitForSelector('#CLOUD_ID_2', { waitUntil: 'load'})
  await finCertSdkIframe.click('#CLOUD_ID_2')
  await finCertSdkIframe.type('#CLOUD_ID_2', '01088957500')
  await finCertSdkIframe.waitForTimeout(300)
  await finCertSdkIframe.waitForSelector('#CLOUD_ID_3', { waitUntil: 'load'})
  await finCertSdkIframe.click('#CLOUD_ID_3')
  await finCertSdkIframe.type('#CLOUD_ID_3', '19831206')
  await finCertSdkIframe.waitForTimeout(300)
  // await finCertSdkIframe.waitForSelector('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.checkbox_pack > label > span.checkbox_shape', { waitUntil: 'load'})
  // await finCertSdkIframe.click('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.checkbox_pack > label > span.checkbox_shape')
  await finCertSdkIframe.waitForSelector('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.login_confirm_wrap > button')
  await finCertSdkIframe.click('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.login_confirm_wrap > button')


  
  




  // await finCertSdkIframe.evaluate(() => {

  //   const name = $('#CLOUD_ID_1');
  //   const phone = $('#CLOUD_ID_2');
  //   const birth = $('#CLOUD_ID_3');

  //   name.val('정재현');
  //   phone.val('01088957500');
  //   birth.val('19831206');

  //   const autologin = $('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.checkbox_pack > label > span.checkbox_shape');
  //   const confirm = $('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.login_confirm_wrap > button');

  //   autologin.click();
  //   confirm.click();
  
  // })

  
  await finCertSdkIframe.waitForSelector('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.code_info_area')
  // 핸드폰 YesKey인증 번호 문자 발송 후
  await finCertSdkIframe.waitForSelector('#__fincert_root__ > div > div > div.cf_layer_pagepop.wai_show.active > div > div.lp_container.key_layer > div > div.password_input_area > div')

  
  await mainFrame.evaluate(() => {
    console.log('frmMain1.rlnmNum1.value: ', frmMain1.rlnmNum1.value)
    console.log('frmMain1.rlnmNum2.value: ', frmMain1.rlnmNum2.value)
    frmMain1.rlnmNum.value = frmMain1.rlnmNum1.value + '1111111'
    console.log('frmMain1.rlnmNum.value: ', frmMain1.rlnmNum.value)


    console.log('jumin2 hash value', npVCtrl.keypadObject[0]._hashelement[0].value)
  }
  );


  // await page.waitForResponse((res) => console.log(res));
  
  
  // // 기존 연결 끊기
  // await finCertSdkIframe.waitForSelector('#__fincert_root__ > div > div > div.cf_layer_pagepop.wai_show.active > div > div.lp_header > button')
  // await finCertSdkIframe.click('#__fincert_root__ > div > div > div.cf_layer_pagepop.wai_show.active > div > div.lp_header > button');

  // await finCertSdkIframe.waitForSelector('#__fincert_root__ > div > div > div.cf_totalmenu > div.tm_menu_wrap > div.tm_menu_inner > div.tm_menu > ul > li:nth-child(1) > ul > li:nth-child(1) > a > p')
  // await finCertSdkIframe.click('#__fincert_root__ > div > div > div.cf_totalmenu > div.tm_menu_wrap > div.tm_menu_inner > div.tm_menu > ul > li:nth-child(1) > ul > li:nth-child(1) > a > p');


  // await finCertSdkIframe.waitForSelector('#__fincert_layer_alert__ > div > div > div > div.cfa_bottom > div > div:nth-child(2) > button')
  // await finCertSdkIframe.click('#__fincert_layer_alert__ > div > div > div > div.cfa_bottom > div > div:nth-child(2) > button')

  // // 새 연결 상태에서 다시 금융인증서 로그인
  // await mainFrame.waitForSelector('#contents > div > div > div:nth-child(4) > div > a:nth-child(2)')
  // await mainFrame.evaluate(() => window.signFin(frmMain1, frmMain1.rlnmNum.value , OID4Personal, null, null, '01'));


  // await finCertSdkIframe.waitForSelector('#CLOUD_ID_1', { waitUntil: 'load'})
  // await finCertSdkIframe.click('#CLOUD_ID_1')
  // await finCertSdkIframe.type('#CLOUD_ID_1', '정재현')
  // await finCertSdkIframe.waitForTimeout(300)
  // await finCertSdkIframe.waitForSelector('#CLOUD_ID_2', { waitUntil: 'load'})
  // await finCertSdkIframe.click('#CLOUD_ID_2')
  // await finCertSdkIframe.type('#CLOUD_ID_2', '01088957500')
  // await finCertSdkIframe.waitForTimeout(300)
  // await finCertSdkIframe.waitForSelector('#CLOUD_ID_3', { waitUntil: 'load'})
  // await finCertSdkIframe.click('#CLOUD_ID_3')
  // await finCertSdkIframe.type('#CLOUD_ID_3', '19831206')
  // await finCertSdkIframe.waitForTimeout(300)
  // // await finCertSdkIframe.waitForSelector('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.checkbox_pack > label > span.checkbox_shape', { waitUntil: 'load'})
  // // await finCertSdkIframe.click('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.checkbox_pack > label > span.checkbox_shape')
  // await finCertSdkIframe.waitForSelector('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.login_confirm_wrap > button')
  // await finCertSdkIframe.click('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div.cf_contents > div.login_input_area > div.login_confirm_wrap > button')



  await finCertSdkIframe.evaluate(() => {

    // 중요!! finCertSdkIframe(about:black) frame에서!! 금융인증서 hash별 버튼 label
    const button0 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 0).action;    
    const button1 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 1).action;    
    const button2 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 2).action;    
    const button3 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 3).action;    
    const button4 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 4).action;    
    const button5 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 5).action;    // 'data:p53:p53'
    const button6 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 6).action;    
    const button7 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 7).action;    
    const button8 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 8).action;    
    const button9 = Object.values(npVCtrl.keypadObject[0]._keypaditems[0].buttons).find((e) => e.label == 9).action;    

    $(`img[data-action="${button5}"]`).click().keyup();   //  금융인증서 창에서 data-action attr이 data:p53:p53인 element를 찾아 클릭한다.
    $(`img[data-action="${button0}"]`).click().keyup();   
    $(`img[data-action="${button0}"]`).click().keyup();   
    $(`img[data-action="${button9}"]`).click().keyup();   
    $(`img[data-action="${button0}"]`).click().keyup();   
    $(`img[data-action="${button0}"]`).click().keyup();   
  })
  
  console.log('5009입력 후 frames', page.frames());

  // await page.waitForResponse((res) => console.log('500900후 res: ', res));


  // const [ , , , , , , mainFrame2] = page.frames();
  // console.log("🚀 ~ file: payinfo.js ~ line 286 ~ mainFrame2", mainFrame2)

  // const mainFrameSpan = await mainFrame.waitForSelector('span')
  // console.log("🚀 ~ file: payinfo.js ~ line 289 ~ mainFrameSpan", mainFrameSpan)

  


  const errorRes = await mainFrame.waitForSelector('#contents > div.layer_body2.layer_body2_bg')
  console.log("🚀 ~ file: payinfo.js ~ line 292 ~ errorRes", errorRes)
  

  const catpchaImg = await mainFrame.waitForSelector('#catpcha > img');
  console.log("🚀 ~ file: payinfo.js ~ line 291 ~ catpchaImg", catpchaImg)

  

  await mainFrame.evaluate(() => document.getElementsByTagName('div'))

  await mainFrame.waitForSelector('#__fincert_root__ > div > div > div.cf_layout > div.cf_container > div > div.card_swiper')
  
  // await page.waitForResponse((res) => console.log(res));
  
  // await finCertSdkIframe.waitForNavigation();

  await mainFrame.evaluate(() => document.getElementsByTagName('div'))
  // await finCertSdkIframe.waitForNavigation();
  // await finCertSdkIframe.waitForResponse((res) => console.log(res));
  

// FinCert 인증서 List 중 '폐지' textContent 아닌 것말 고르기!!
  // FCV_Array.map(e => Array.from(e.children).map(e => e.textContent))


  
  // const finCertSdkIframe = await mainFrame.childFrames();
  // console.log("🚀 ~ file: payinfo.js ~ line 161 ~ finCertSdkIframe", finCertSdkIframe)

  // const finCertSdkIframe = page.frames().find(frame => console.log(frame), frame.name() === 'iframe');
  // console.log("🚀 ~ file: payinfo.js ~ line 162 ~ finCertSdkIframe", finCertSdkIframe)


})();
