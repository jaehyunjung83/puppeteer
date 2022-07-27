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
    { headless: false },
    { args: ["--window-size=1920,1080", "--disable-notifications", "--flag-switches-begin --enable-lens-region-search --flag-switches-end"] }
    // { userDataDir: './user-data-dir' }
  );

  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on("request", (req) => {
    switch (req.resourceType()) {
      case "font":
    //   case "image":
        req.abort();
        break;
      default:
        req.continue();
    }
  });

  page.setDefaultNavigationTimeout(0);

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://credit4u.or.kr:2443/memb/memberLoginView.do", {
    waitUntil: "networkidle0",
  });


  await page.setViewport({ width: 1080, height: 1080 });
  console.log("🚀 ~ file: payinfo.js ~ line 60 ~ page", page.frames())

  // const [mainFrame] = page.frames()
  // console.log("🚀 ~ file: evaluatePractice.js ~ line 58 ~ mainFrame", mainFrame)
  const captchaimg = await page.waitForSelector('#imgCaptcha')
  console.log("🚀 ~ file: evaluatePractice.js ~ line 59 ~ captchaimg", captchaimg)
  await captchaimg.screenshot({ path: './captcha.jpg', encoding: "base64",})

  function functionToInject (){
    return 1+1;
  }

  function otherFunctionToInject(input){
      return 6
  }
  function chkCaptcha () {
    return true;
  }  

  await page.addScriptTag({ type: 'text/javascript', content: `${chkCaptcha}` });


})();


