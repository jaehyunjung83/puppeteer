// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const puppeteerExtraPluginUserAgentOverride = require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");

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
    { headless: false, slowMo: 1 },
    { args: ["--window-size=1920,1080", "--disable-notifications"] }
  );

  //   await browser.platform('Win32');
  //   await browser.userAgent(
  //     "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; MaWebDRM; rv:11.0) like Gecko"
  //   );
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0); 


  console.log("launch후 UserAgent", await page.evaluate("navigator.userAgent"));
  console.log("launch후 UserAgent", await page.evaluate("navigator.platform"));

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://cont.insure.or.kr/cont_web/intro.do", {
    waitUntil: "load",
  });

  await page.setViewport({ width: 1080, height: 1080 });

  await page.waitForSelector("body > #wrapper > #main_contents > .link_view");

  await page.evaluate(() => {
    return document.querySelector(".link_view").click();
  });

  // await page.click(linkViewClick)

  // await navigationPromise.then((res) => console.log('조회하기버튼 res', res)).catch(e => console.log('naviPromise Error', err));

  await page.waitForSelector("#applcntNm", { waitUntil: "load" });
  await page.click("#applcntNm");
  await page.type("#applcntNm", "정재현");

  await page.waitForSelector("#telno1");
  await page.click("#telno1");
  await page.type("#telno1", "010");

  await page.waitForSelector("#telno2");
  await page.click("#telno2");
  await page.type("#telno2", "8895");

  await page.waitForSelector("#telno3");
  await page.click("#telno3");
  await page.type("#telno3", "7500");

  await page.waitForSelector("#ssn1");
  await page.click("#ssn1");
  await page.type("#ssn1", "831206");

  await page.waitForSelector("#ssn2");
  await page.click("#ssn2");
  await page.type("#ssn2", "1001722");

  await page.waitForSelector("#email1");
  await page.click("#email1");
  await page.type("#email1", "jjjh1983");

  await page.waitForSelector("#email2");
  await page.click("#email2");
  await page.type("#email2", "naver.com");

  console.log("cert전 UserAgent", await page.evaluate("navigator.userAgent"));
  console.log("cert전 UserAgent", await page.evaluate("navigator.platform"));

  // 공동인증서 인증 버튼 클릭
  await page.waitForSelector("#cert");
  await page.click("#cert");

  console.log('pop열렸을 때 page', page);
//   debugger;
  const newPagePromise = new Promise((x) =>
    browser.once("targetcreated", (target) => x(target.page(), console.log(x), console.log(target)))
  );
  const popup = await newPagePromise;
  console.log("🚀 ~ file: insure.js ~ line 93 ~ popup", popup.url())
  
  // popup창 alert창 뜨는 거 확인 버튼
  page.on("dialog", async (dialog) => {
    console.log("dialog");
    await dialog.accept();
  });

  //  OS 이상하다고 뜨는 alert dialog 무시하기
  //   await popup.waitForSelector('[name="__CONFIRM__"]', {waitUntil: 'load'});
  //   const confirm = await popup.$('[name="__CONFIRM__"]');
  //   await popup.click('[name="__CONFIRM__"]');

  await navigationPromise.then((res)=>console.log('res', res));

  // popup창 전체 동의 체크박스
//   await popup.waitForSelector("#pubCertAgree");

  const pubCertAgree = await popup.waitForSelector('form > .agreeWithPolicy > .agreeAll > .label > .checkboxWithTxt', { waitUntil: "load" });
  console.log("🚀 ~ file: insure.js ~ line 111 ~ pubCertAgree", pubCertAgree)
  pubCertAgree.click();

  const isCheckBoxChecked = await pubCertAgree.getProperty("checked");
  console.log("🚀 ~ file: insure.js ~ line 115 ~ isCheckBoxChecked", isCheckBoxChecked)

  

//   setTimeout(async () => {
//     await page.evaluate((evaluate) => {
//       return (document.getElementById("pubCertAgree1").checked = true);
//     });
//     await page.evaluate(() => {
//       return (document.getElementById("pubCertAgree2").checked = true);
//     });
//   }, [1000]);
  //   await page.waitForSelector(
  //     "form > .agreeWithPolicy > .agreeAll > .input#pubCertAgree.checkbox"
  //   );
  //   await page.click(
  //     "form > .agreeWithPolicy > .agreeAll > .input#pubCertAgree.checkbox"
  //   );

  // popup창 '인증하기' 버튼
  await popup.waitForSelector("#btnPubCert");
  await popup.click("#btnPubCert");

  await navigationPromise;

  await popup.waitForSelector('#certificate_file')
  await popup.click("#certificate_file");

  
  
  await popup.waitForSelector("#checkAgree1_Y");
  await popup.click("#checkAgree1_Y");

  await popup.waitForSelector("#checkAgree2_Y");
  await popup.click("#checkAgree2_Y");

  await popup.waitForSelector("#checkAgree3_Y");
  await popup.click("#checkAgree3_Y");

  await popup.waitForSelector("#checkAgree4_Y");
  await popup.click("#checkAgree4_Y");

  await page.waitForSelector(
    "#contents > #insuranceAgree > #agreeForm > .btn_area > .btn_next_go"
  );
  await page.click(
    "#contents > #insuranceAgree > #agreeForm > .btn_area > .btn_next_go"
  );

  await page.waitForSelector("#112201130915");
  await page.click("#112201130915");

  await page.waitForSelector("#popuForm");
  await page.click("#popuForm");

  await page.waitForSelector(
    "#AFTER_START > #resultDetail > .btn_area > .btn_print > .icon_print"
  );
  await page.click(
    "#AFTER_START > #resultDetail > .btn_area > .btn_print > .icon_print"
  );

  await navigationPromise;

  await browser.close();
})();
